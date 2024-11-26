import React from "react";

interface Song {
  song_id: string;
  title: string;
  artist: string;
  genre: string;
  decade: string;
}

interface SongCardProps {
  song: Song;
  loading: boolean;
  sortBy: "decade" | "genre";
}

const SongCard: React.FC<SongCardProps> = ({ song, loading, sortBy }) => {
  return (
    <div className="song-container bg-white opacity-90 cd rounded p-2">
      {loading ? (
        <>
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          <h2 className="text-m font-semibold border-b mb-1">{song.title}</h2>
          <p className="text-sm text-gray-700 border-b pb-1">
            {song.artist} ({song.genre})
          </p>
          {sortBy !== "decade" && song.decade && (
            <p className="text-sm">{song.decade}'s </p>
          )}
        </>
      )}
    </div>
  );
};

export default SongCard;
