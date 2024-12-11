import React from "react";
import { Bars } from "react-loader-spinner";

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
          <Bars
            height="80"
            width="80"
            color="blue"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
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
