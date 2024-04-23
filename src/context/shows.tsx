import { getEpisodes, getSeasons, getShows } from "@/services/shows";
import { ReactNode, createContext, useState } from "react";

type Show = {
  id: number;
  name: string;
  genres: string[];
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  rating: {
    average: number;
  };
  status: string;
  premiered: string;
  ended: string;
};

type Episode = {
  id: number;
  name: string;
  summary: string;
  image: {
    medium: string;
    original: string;
  };
  runtime: number;
  season: number;
  number: number;
};

type Season = {
  id: number;
  number: number;
  episodeOrder: number;
};

type ShowsGrouped = {
  shows: Show[];
  gender: string;
};

type ShowsContext = {
  showsGrouped: ShowsGrouped[];
  loading: boolean;
  handleSelectShow: ({ show }: { show: Show }) => void;
  seasons: Season[];
  episodes: Episode[];
  selectedShow: Show;
  onSelectSeason: ({ seasonNumber }: { seasonNumber: number }) => void;
  loadShows: () => void;
  episodesBySeason: Episode[];
};

export const ShowsContext = createContext({} as ShowsContext);

export function ShowsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showsGrouped, setShowsGrouped] = useState<ShowsGrouped[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show>({} as Show);
  const [episodesBySeason, setEpisodesBySeason] = useState<Episode[]>([]);

  const onSelectSeason = ({ seasonNumber = 1 }: { seasonNumber?: number }) => {
    const filteredEpisodes = episodes.filter(
      (episode) => episode.season === seasonNumber
    );

    setEpisodesBySeason(filteredEpisodes);
  };

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

  const handleSelectShow = async ({ show }: { show: Show }) => {
    setLoading(true);

    setSelectedShow(show);

    await Promise.all([
      loadEpisodes({ showId: show.id }),
      loadSeasons({ showId: show.id }),
    ]);

    setLoading(false);
  };

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
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
}
