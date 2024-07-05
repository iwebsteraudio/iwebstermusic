import axios from "axios";

const storedUser = localStorage.getItem("user");

export const fetchAllSongs = () => {
  return axios
    .get(``)
    .then((response) => {
      response.songs;
    })
    .catch((err) => {
      console.log(err);
    });
};
