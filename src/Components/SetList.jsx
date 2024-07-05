import songsData from "../../public/songsDatabase.json"
import SongCard from "./SongCard";

const sixties = songsData.songs.filter(song => song.decade === "1960");

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