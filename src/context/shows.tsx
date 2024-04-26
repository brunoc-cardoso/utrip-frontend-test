import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Episode, Season, Show, ShowsGrouped } from "@/context/shows/types";
import { getEpisodes, getSeasons, getShow, getShows } from "@/services/shows";

type ShowsContext = {
  showsGrouped: ShowsGrouped[];
  loading: boolean;
  seasons: Season[];
  episodes: Episode[];
  selectedShow: Show;
  onSelectSeason: ({ seasonNumber }: { seasonNumber: number }) => void;
  loadShows: () => void;
  loadShowDetails: ({ showId }: { showId: number }) => void;
  episodesBySeason: Episode[];
};

export const ShowsContext = createContext({} as ShowsContext);

export function ShowsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showsGrouped, setShowsGrouped] = useState<ShowsGrouped[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodesBySeason, setEpisodesBySeason] = useState<Episode[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show>({} as Show);

  const loadEpisodes = async ({ showId }: { showId: number }) => {
    const loadedEpisodes = await getEpisodes({ showId });
    setEpisodes(loadedEpisodes);
  };

  const loadSeasons = async ({ showId }: { showId: number }) => {
    const loadedSeasons = await getSeasons({ showId });
    setSeasons(loadedSeasons);
  };

  const loadShows = async () => {
    const shows = await getShows();
    groupByGender({ shows });
  };

  const loadShow = async ({ showId }: { showId: number }) => {
    const show = await getShow({ showId });
    setSelectedShow(show);
  };

  const loadShowDetails = async ({ showId }: { showId: number }) => {
    setLoading(true);

    await Promise.all([
      await loadShow({ showId }),
      await loadEpisodes({ showId }),
      await loadSeasons({ showId }),
    ]);

    setLoading(false);
  };

  const groupByGender = ({ shows }: { shows: Show[] }) => {
    let genres: string[] = [];

    shows.forEach((show) => {
      show.genres.forEach((gender: string) => genres.push(gender));
    });

    genres = [...new Set(genres)];

    const showsGroupedByGender = genres.map((gender) => {
      const filteredShows = shows.filter((show) =>
        show.genres.includes(gender)
      );

      return {
        gender,
        shows:
          filteredShows.length > 50
            ? filteredShows.splice(0, 50)
            : filteredShows,
      };
    });

    const showsWithoutGender = [
      {
        shows: [...shows.filter((show) => show.genres.length === 0)],
        gender: "Others",
      },
    ];

    setShowsGrouped([...showsGroupedByGender, ...showsWithoutGender]);
  };

  const onSelectSeason = useCallback(
    ({ seasonNumber = 1 }: { seasonNumber?: number }) => {
      const filteredEpisodes = episodes.filter(
        (episode) => episode.season === seasonNumber
      );

      setEpisodesBySeason(filteredEpisodes);
    },
    [episodes]
  );

  useEffect(() => {
    onSelectSeason({ seasonNumber: 1 });
  }, [episodes, onSelectSeason, seasons]);

  return (
    <ShowsContext.Provider
      value={{
        loading,
        loadShows,
        showsGrouped,
        seasons,
        episodes,
        selectedShow,
        onSelectSeason,
        episodesBySeason,
        loadShowDetails,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
}
