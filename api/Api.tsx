import axios from "axios";
import YtApiKey from "./YoutubeApiKey";
import { error } from "console";

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
  const apiKey = YtApiKey;
  return axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${apiKey}`
    )
    .then((data) => data)
    .then((list) => console.log(list))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
