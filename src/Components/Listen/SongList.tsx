import React from "react";
import { SongMp3 } from "utils/types";

interface SongListProps {
  songData: SongMp3[];
  trackIndex: number;
  onSongSelect: (index: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songData, trackIndex, onSongSelect }) => {
  return (
    <div className="flex justify-center font-righteous items-center w-full p-8">
      {/*Dropdown Track Select*/}
      <select
        value={trackIndex}
        onChange={(e) => onSongSelect(Number(e.target.value))}
        className="p-3 w-full border border-gray-300 rounded-lg "
      >
        {songData.map((song, index) => (
          <option key={song.fileName} value={index}>
            {song.fileName.split(".")[0].split("_").join(" ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SongList;
