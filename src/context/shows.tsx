import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Episode, Season, Show, ShowsGrouped } from "@/context/shows/types";
import { getEpisodes, getSeasons, getShows } from "@/services/shows";
import {
  getItemFromLocalStorage,
  setItemOnLocalStorage,
} from "@/utils/localStorage";

type ShowsContext = {
  showsGrouped: ShowsGrouped[];
  loading: boolean;
  handleSelectShow: ({ show }: { show: Show }) => void;
  seasons: Season[];
  episodes: Episode[];
  selectedShow: Show;
  onSelectSeason: ({ seasonNumber }: { seasonNumber: number }) => void;
  loadShows: () => void;
  loadSeasonsAndEpisodes: () => void;
  episodesBySeason: Episode[];
};

export const ShowsContext = createContext({} as ShowsContext);

export function ShowsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showsGrouped, setShowsGrouped] = useState<ShowsGrouped[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodesBySeason, setEpisodesBySeason] = useState<Episode[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show>(() => {
    const show = getItemFromLocalStorage({ key: "selectedShow" });
    return show ? show : ({} as Show);
  });

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

  const loadSeasonsAndEpisodes = async () => {
    setLoading(true);

    await Promise.all([
      await loadEpisodes({ showId: selectedShow.id }),
      await loadSeasons({ showId: selectedShow.id }),
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

  const handleSelectShow = async ({ show }: { show: Show }) => {
    setLoading(true);

    setSelectedShow(show);
    setItemOnLocalStorage({ key: "selectedShow", value: JSON.stringify(show) });

    await loadSeasonsAndEpisodes();
    setLoading(false);
  };

  useEffect(() => {
    onSelectSeason({ seasonNumber: 1 });
  }, [episodes, onSelectSeason, seasons]);

  return (
    <ShowsContext.Provider
      value={{
        loading,
        loadShows,
        showsGrouped,
        handleSelectShow,
        seasons,
        episodes,
        selectedShow,
        onSelectSeason,
        episodesBySeason,
        loadSeasonsAndEpisodes,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
}
