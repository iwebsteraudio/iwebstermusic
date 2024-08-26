import axios from "axios";

const storedUser = localStorage.getItem("user");
const BASE_URL = "http://localhost:9090/api"
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

export const createUser = () =>{
  return axios
  .post(`${BASE_URL}/users`)
  .then((response) =>{
    return response.data.userData
  })
}