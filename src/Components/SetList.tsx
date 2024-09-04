import React, { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/Api";
import SongCard from "./SongCard";

interface Song {
  song_id: string;
  title: string;
  decade: string;
  genre: string;
  patch: string;
}

const SetList: React.FC = () => {
  const [songData, setSongData] = useState([]);
  const [error, setError] = useState<String | null> (null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"decade" | "genre">("decade");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await fetchAllSongs();
        const sortedSongs = songs.sort((a: Song, b: Song) =>
          a.decade.localeCompare(b.decade)
        );
        setSongData(sortedSongs.map((song:{}) => ({ ...song, loading: true })));

        setTimeout(() => {
          setSongData(sortedSongs.map((song:{}) => ({ ...song, loading: false })));
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log("Failed to fetch songs", error);
        setError("Error fetching songs. Sorry about that.");
      }
    };
    fetchSongs();
  }, []);

  const handleSort = (option: "decade" | "genre") => {
    setSortBy(option);
    let sortedSongs;
    switch (option) {
      case "decade":
        sortedSongs = [...songData].sort((a: Song, b: Song) =>
          a.decade.localeCompare(b.decade)
        );
        break;
      case "genre":
        sortedSongs = [...songData].sort((a: Song, b: Song) =>
          a.genre.localeCompare(b.genre)
        );
        break;
      default:
        sortedSongs = songData;
    }
    setSongData(sortedSongs);
  };

  const groupSongs = (songs: Song[], sortBy: "decade" | "genre"): Record<string, Song[]> => {
    return songs.reduce((groups: Record<string, Song[]>, song: Song) => {
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
          onChange={(e) => handleSort(e.target.value as "decade" | "genre")}
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
              {groupedSongs[group].map((song: Song) => (
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
