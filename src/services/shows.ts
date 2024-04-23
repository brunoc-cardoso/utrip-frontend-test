import { BASE_URL } from "@/services/index";

export const getShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("[error]: ", error);
  }
};

export const getSeasons = async ({ showId }: { showId: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/seasons`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("[error]: ", error);
  }
};

export const getEpisodes = async ({ showId }: { showId: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/episodes`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("[error]: ", error);
  }
};
