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
    <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-evenly text-xs m-4 sm:m-8">
      {/* Previous Button */}
      <button
        className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-3 sm:p-4 w-16 h-16 sm:w-24 sm:h-24 flex flex-col items-center justify-center outline-none hover:shadow-md"
        onClick={prevTrack}
        disabled={disabled}
      >
        <SkipBack size={30} className="mb-2" />
        <span>prev</span>
      </button>

      {/* Play/Pause Button */}
      {!isPlaying ? (
        sound ? (
          <button
            className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-4 sm:p-6 w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center outline-none hover:shadow-md"
            onClick={onPlayPause}
            disabled={disabled}
          >
            <PlayCircle size={50} strokeWidth={1.2} className="mb-2" />
            <span>play</span>
          </button>
        ) : (
          <button
            className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-4 sm:p-6 w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center outline-none hover:shadow-md"
            disabled={disabled}
          >
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="blue"
              ariaLabel="three-circles-loading"
            />
            <span className="sr-only">Loading...</span>
          </button>
        )
      ) : (
        <button
          className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-4 sm:p-6 w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center outline-none hover:shadow-md"
          onClick={onPlayPause}
          disabled={disabled}
        >
          <PauseIcon size={50} strokeWidth={1.2} className="mb-2" />
          <span>pause</span>
          <div className="absolute inset-0 flex justify-center items-center opacity-5 rounded-lg m-5 -z-10">
            <Audio
              height="500"
              width="500"
              color="indigo"
              ariaLabel="audio-playing-animation"
              visible={true}
            />
          </div>
        </button>
      )}
      {/* Next Button */}
      <button
        className="playButton bg-indigo-50 hover:bg-indigo-200 rounded-lg p-3 sm:p-4 w-16 h-16 sm:w-24 sm:h-24 flex flex-col items-center justify-center outline-none hover:shadow-md"
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
