import React from "react";

interface Song {
  fileName: string;
  url: string;
}

interface SongListProps {
  songData: Song[];
  trackIndex: number;
  onSongSelect: (index: number) => void;
}

const SongList: React.FC<SongListProps> = ({
  songData,
  trackIndex,
  onSongSelect,
}) => {
  return (
    <div className="flex justify-center font-righteous items-center w-full">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {songData.map((song, index) => {
          return (
            <li
              key={song.fileName}
              onClick={() => onSongSelect(index)}
              className={`border p-2 cursor-pointer transition-all duration-300 ease-in-out 
          ${
            trackIndex === index ? "bg-slate-200 font-bold" : "hover:font-bold"
          } font-medium test-ellipsis whitespace-nowrap`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis,",
              }}
            >
              {song.fileName.split(".")[0].split("_").join(" ")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SongList;
