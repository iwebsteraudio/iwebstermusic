import React from "react";

import { PlayCircle, SkipBack, SkipForward, PauseIcon } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  disabled: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  nextTrack,
  prevTrack,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-evenly text-xs">
      <button
        className="playButton hover:bg-stone-200 rounded-lg p-8"
        onClick={prevTrack}
        disabled={disabled}
      >
        <SkipBack size={30} className="mb-2" />
        <span>prev</span>
      </button>
      {!isPlaying ? (
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={onPlayPause}
          disabled={disabled}
        >
          <PlayCircle size={60} strokeWidth={1.2} className="mb-2" />
          <span>play</span>
        </button>
      ) : (
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={onPlayPause}
          disabled={disabled}
        >
          <PauseIcon size={60} strokeWidth={1.2} className="mb-2" />
          <span>pause</span>
        </button>
      )}
      <button
        className="playButton hover:bg-stone-200 rounded-lg p-8"
        onClick={nextTrack}
        disabled={disabled}
      >
        <SkipForward size={30} className="mb-2" />
        <span>next</span>
      </button>
    </div>
  );
};

export default PlayerControls;