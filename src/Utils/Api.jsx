import axios from "axios";

const storedUser = localStorage.getItem("user");

export const fetchAllSongs = () => {
  return axios
    .get(`http://localhost:9090/api/songs`)
    .then((response) => {
      return response.data.songData;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
