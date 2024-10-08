import axios from "axios";
import YtApiKey from "./YoutubeApiKey";

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

// const storedUser = localStorage.getItem("user");
const BASE_URL = "http://localhost:9090/api";
const ONE_HOUR = 60 * 60 * 1000;
let cachedYoutubeData: YouTubeVideo[] = [];
let lastFetchTime: number = 0;
const apiKey = YtApiKey();
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
