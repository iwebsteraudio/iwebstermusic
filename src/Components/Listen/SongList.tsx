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
    <div className="flex">
    <ul className=" justify-center text-left">
      {songData.map((song, index) => {
        return <li key={song.fileName}
        onClick={() => onSongSelect(index)}
        className={trackIndex === index ? "bg-slate-200 border" : "border"}
        >{song.fileName.split(".")[0].split("_").join(" ")}</li>;
      })}
    </ul>
    </div>
  );
};

export default SongList;