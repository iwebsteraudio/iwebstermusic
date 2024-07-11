import axios from "axios";

const storedUser = localStorage.getItem("user");

export const fetchAllSongs = () => {
  return axios
    .get(`http://localhost:9090/api/songs`)
    .then((response) => {
      console.log(response.data.songData);
    })
    .catch((err) => {
      console.log(err);
    });
};
