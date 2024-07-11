import { useEffect, useState } from 'react';
import { fetchAllSongs } from "../Utils/Api";
import SongCard from "./SongCard";

const SetList = () => {

 const [songData, setSongData ] = useState([]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await fetchAllSongs();
        setSongData(songs);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch songs", error);
        setError("Error fetching songs. Sorry about that.");
      }
    };
    fetchSongs();
  }, []);

  if (error) {
    return <p>{error}</p>
  }


  return (
    <>
    <div className='text-white'>{loading && <p>waiting for songs</p>}</div>
    <ul>
      {songData.map((song) => (
        <SongCard key={song.song_id} song={song} />
      ))}
    </ul>
    </>
  );
};

export default SetList;
