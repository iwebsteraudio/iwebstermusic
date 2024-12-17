import React, { useEffect, useState } from "react";
import { fetchAllSongs } from "../../../api/Api";
import SongCard from "./SongCard";
import AddSongs from "./AddSongs";
import { Song } from "utils/types";

const allowedKeys: Record<number, string> = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  66: "b",
};

const konamiCode = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "b",
  "a",
];

const SetList: React.FC = () => {
  const [songData, setSongData] = useState<Song[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"decade" | "genre">("decade");
  const [isEditMode, setIsEditMode] = useState(false);

  let konamiCodePosition = 0;


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await fetchAllSongs();
        const sortedSongs = songs.sort((a: Song, b: Song) =>
          a.decade.localeCompare(b.decade)
        );
        setSongData(
          sortedSongs.map((song: {}) => ({ ...song, loading: true }))
        );

        setTimeout(() => {
          setSongData(
            sortedSongs.map((song: {}) => ({ ...song, loading: false }))
          );
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log("Failed to fetch songs", error);
        setError("Error fetching songs. Sorry about that.");
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = allowedKeys[e.keyCode];
      const requiredKey = konamiCode[konamiCodePosition];

      if (key === requiredKey) {
        konamiCodePosition++;

        if (konamiCodePosition === konamiCode.length) {
          setIsEditMode(true);
          console.log("You have entered edit mode. Please note, database is password protected")
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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

  const groupSongs = (
    songs: Song[],
    sortBy: "decade" | "genre"
  ): Record<string, Song[]> => {
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
    return (
      <div className="text-white-500">
        <p>{error}</p>
        <a 
          href="#"
          onClick={() => window.location.reload()}
          className="text-blue-500 underline"
        >
          Reload Page
        </a>
      </div>
    );
  }

  const groupedSongs = groupSongs(songData, sortBy);

  return (
    <>
      {isEditMode && ( <AddSongs
      songData={songData}
      setSongData={setSongData}
      error={error}
      setError={setError}
      />)}
      <div className="pt-4">
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
                  songData={songData}
                  setSongData={setSongData}
                  song={song}
                  loading={loading}
                  sortBy={sortBy}
                  isEditMode={isEditMode}
                  error={error}
                  setError={setError}
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
