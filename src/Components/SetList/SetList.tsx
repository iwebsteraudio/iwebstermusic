import React, { useEffect, useRef, useState } from "react";
import { fetchAllSongs } from "../../../api/Api";
import SongCard from "./SongCard";
import AddSongs from "./AddSongs";
import { Song } from "utils/types";
import { konamiCodeListener, tapListener } from "../../../utils/eventListeners";

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
  const tapButtonRef = useRef<HTMLButtonElement>(null);

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
    const konamiListener = konamiCodeListener(allowedKeys, konamiCode, () => {
      console.log("Konami Code Activated!");
      setIsEditMode(true);
    });

    const tapListenerInstance = tapListener(13, () => {
      console.log("Tapped 13 times!");
      setIsEditMode(true);
    });

    konamiListener.attach();
    if (tapButtonRef.current) {
      tapListenerInstance.attach(tapButtonRef.current);
    }

    return () => {
      konamiListener.detach();
      if (tapButtonRef.current) {
        tapListenerInstance.detach(tapButtonRef.current);
      }
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
      {isEditMode && (
        <AddSongs
          songData={songData}
          setSongData={setSongData}
          error={error}
          setError={setError}
        />
      )}
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
      <button
      ref={tapButtonRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent w-20 h-20 rounded-full opacity-0 hover:opacity-100 hover:bg-gray-800 hover:bg-opacity-20 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      ></button>
    </>
  );
};

export default SetList;
