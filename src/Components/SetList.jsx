import songsData from "../../public/songsDatabase.json"
import { fetchAllSongs } from "../Utils/Api";
import SongCard from "./SongCard";

const songData = fetchAllSongs();

const sixties = songData.filter(song => song.decade === "1960");
console.log(sixties)

const SetList = () => {
    return (
        <ul>
            {sixties.map((song) => (
                <SongCard key={song.song_id} song={song} />
            ))}
        </ul>
    )
}

export default SetList;