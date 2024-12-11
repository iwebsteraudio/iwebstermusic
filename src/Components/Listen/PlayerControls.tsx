import React from "react";

import { PlayCircle, SkipBack, SkipForward, PauseIcon } from "lucide-react";

import { ThreeDots, Audio } from "react-loader-spinner";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  disabled: boolean;
  sound: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  nextTrack,
  prevTrack,
  disabled,
  sound,
}) => {
  return (
    <div className="flex items-center justify-evenly text-xs">
      <button
        className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-8 border-2 border-indigo-300"
        onClick={prevTrack}
        disabled={disabled}
      >
        <SkipBack size={30} className="mb-2" />
        <span>prev</span>
      </button>
      {!isPlaying ? (
        sound ? (
          <button
            className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-8 border-2 border-indigo-300"
            onClick={onPlayPause}
            disabled={disabled}
          >
            <PlayCircle size={60} strokeWidth={1.2} className="mb-2" />
            <span>play</span>
          </button>
        ) : (
          <button
            className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-8"
            disabled={disabled}
          >
            <ThreeDots
              visible={true}
              height="100"
              width="50"
              color="blue"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <span className="sr-only">Loading...</span>
          </button>
        )
      ) : (
        <button
          className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-8 border-2 border-indigo-300"
          onClick={onPlayPause}
          disabled={disabled}
        >
          <PauseIcon size={60} strokeWidth={1.2} className="mb-2" />
          <span>pause</span>
          <div className="absolute inset-0 flex justify-center items-center opacity-5 rounded-lg -z-10">
            <Audio
              height="500"
              width="500"
              color="indigo"
              ariaLabel="audio-playing-animation"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        </button>
      )}
      <button
        className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-8 border-2 border-indigo-300"
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
