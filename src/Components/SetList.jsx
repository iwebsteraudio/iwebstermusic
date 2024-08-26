import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../public/api/Api";
import SongCard from "./SongCard";

const SetList = () => {
  const [songData, setSongData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("decade");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await fetchAllSongs();
        const sortedSongs = songs.sort((a, b) =>
          a.decade.localeCompare(b.decade)
        );
        setSongData(sortedSongs.map((song) => ({ ...song, loading: true })));

        setTimeout(() => {
          setSongData(sortedSongs.map((song) => ({ ...song, loading: false })));
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log("Failed to fetch songs", error);
        setError("Error fetching songs. Sorry about that.");
      }
    };
    fetchSongs();
  }, []);

  const handleSort = (option) => {
    setSortBy(option);
    let sortedSongs;
    switch (option) {
      case "decade":
        sortedSongs = [...songData].sort((a, b) =>
          a.decade.localeCompare(b.decade)
        );
        break;
      case "genre":
        sortedSongs = [...songData].sort((a, b) =>
          a.genre.localeCompare(b.genre)
        );
        break;
      default:
        sortedSongs = songData;
    }
    setSongData(sortedSongs);
  };

  const groupSongs = (songs, sortBy) => {
    return songs.reduce((groups, song) => {
      const key = song[sortBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {});
  };

  if (error) {
    return <p>{error}</p>;
  }

  const groupedSongs = groupSongs(songData, sortBy);

  return (
    <>
      <div>
        <label className="text-white" htmlFor="sort">
          Sort By -
        </label>
        <select
          className="rounded opacity-80 p-3"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="decade">Decade</option>
          <option value="genre">Genre</option>
        </select>{" "}
      </div>
      <div className="song-list">
        {Object.keys(groupedSongs).map((group) => (
          <div key={group} className="song-group">
            <h2 className=" group-header">
              {group}
              {sortBy === "decade" && "'s"}
            </h2>
            <div className="song-cards">
              {groupedSongs[group].map((song) => (
                <SongCard
                  key={song.song_id}
                  song={song}
                  loading={loading}
                  sortBy={sortBy}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SetList;
