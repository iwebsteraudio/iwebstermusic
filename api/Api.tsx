import axios from "axios";
import YtApiKey from "./YoutubeApiKey";

const storedUser = localStorage.getItem("user");
const BASE_URL = "http://localhost:9090/api";
export const fetchAllSongs = () => {
  return axios
    .get(`${BASE_URL}/songs`)
    .then((response) => {
      return response.data.songData;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const createUser = () => {
  return axios.post(`${BASE_URL}/users`).then((response) => {
    return response.data.userData;
  });
};

export const postEmail = (formData: {}) => {
  return axios
    .post(`${BASE_URL}/send-email`, formData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchYouTube = (): Promise<void | {}> => {
  const apiKey = YtApiKey();
  const channelId = "UClTznGqvKRFrVO8ZPhHtiCg";
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
    )
    .then((response) => {
      return response.data.items.filter((item)=> item.id.kind === "youtube#video")
      })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
