import axios, { AxiosResponse } from "axios";
import { Song } from "utils/types";

interface YouTubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

const BASE_URL = "https://iwebstermusic-be.onrender.com/api";
const ONE_HOUR = 60 * 60 * 1000;
let cachedYoutubeData: YouTubeVideo[] = [];
let lastFetchTime: number = 0;
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const channelId = "UClTznGqvKRFrVO8ZPhHtiCg";

export const fetchYouTube = async (): Promise<YouTubeVideo[]> => {
  const currentTime = Date.now();

  if (currentTime - lastFetchTime < ONE_HOUR && cachedYoutubeData.length > 0) {
    console.log("Using cached Youtube data");
    return cachedYoutubeData;
  }

  lastFetchTime = currentTime;

  try {
    const response = await axios.get<YouTubeResponse>(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
    );
    cachedYoutubeData = response.data.items.filter(
      (item) => item.id.kind === "youtube#video"
    );
    return cachedYoutubeData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchAllSongs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/songs`);
    return response.data.songData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchMp3s = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mp3s`);
    return response.data.mp3Data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUser = async (formData: {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, formData);
    return response.data.userData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postEmail = async (formData: {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-email`, formData);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postEmailWithRetry = async (
  formData: {},
  attempts = 3
): Promise<AxiosResponse> => {
  try {
    const response = await postEmail(formData);
    return response;
  } catch (err) {
    if (attempts > 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return postEmailWithRetry(formData, attempts - 1);
    }
    throw err;
  }
};

export const postNewSongsToSetlistWithRetry = async (
  formData: {},
  attempts = 3
): Promise<AxiosResponse> => {
  try {
    const response = await postNewSongsToSetlist(formData);
    return response;
  } catch (err) {
    if (attempts > 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return postNewSongsToSetlistWithRetry(formData, attempts - 1);
    }
    throw err;
  }
};

export const postNewSongsToSetlist = async (formData: {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/songs`, formData);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteSongFromSetlist = async (songData: { song_id: number }) => {
  const { song_id } = songData;
  try {
    const response = await axios.delete(`${BASE_URL}/songs/${song_id}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const patchSong = async (
  song_id: number,
  songData: Partial<Song>
): Promise<Song> => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/songs/${song_id}`,
      songData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
