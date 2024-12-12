import React from "react";
import { SongMp3 } from "utils/types";

interface SongListProps {
  songData: SongMp3[];
  trackIndex: number;
  onSongSelect: (index: number) => void;
}

const SongList: React.FC<SongListProps> = ({
  songData,
  trackIndex,
  onSongSelect,
}) => {
  return (
    <div className="flex justify-center font-righteous items-center w-full p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {songData.map((song, index) => (
          <li
            key={song.fileName}
            onClick={() => onSongSelect(index)}
            className={`p-4 cursor-pointer transition-all duration-300 ease-in-out rounded-lg h-20 flex items-center justify-center
            ${
              trackIndex === index
                ? "bg-indigo-100 font-bold border-2 border-indigo-300"
                : "hover:bg-slate-100"
            }`}
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              className="text-center break-words w-full"
              style={{
                wordBreak: "break-word",
              }}
            >
              {song.fileName.split(".")[0].split("_").join(" ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
