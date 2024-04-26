import { toast } from "react-toastify";

import { BASE_URL } from "@/services/index";

export const getShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error("An error occurred while loading data from Shows.");
  }
};

export const getShow = async ({ showId }: { showId: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}`);
    const data = await response.json();

    if (data?.status === 404) {
      return (window.location.href = "/404");
    }

    return data;
  } catch (error) {
    toast.error("An error occurred while loading data from Show.");
  }
};

export const getSeasons = async ({ showId }: { showId: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/seasons`);
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error("An error occurred while loading data from Seasons.");
  }
};

export const getEpisodes = async ({ showId }: { showId: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/episodes`);
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error("An error occurred while loading data from Episodes.");
  }
};
