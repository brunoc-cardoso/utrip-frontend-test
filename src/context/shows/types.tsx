export type Show = {
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

export type Episode = {
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

export type Season = {
  id: number;
  number: number;
  episodeOrder: number;
};

export type ShowsGrouped = {
  shows: Show[];
  gender: string;
};
