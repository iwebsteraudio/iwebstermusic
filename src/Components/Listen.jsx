import {
  PlayIcon,
  StopCircle,
  SkipBack,
  SkipForward,
  PlayCircle,
  PauseIcon,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import useSound from "use-sound";
import AllOfMe from "../../sounds/songs/AllOfMe.wav";

const Listen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, duration, sound }] = useSound(AllOfMe);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="component rounded">
      <h2>Playing Now:</h2>
      <div>
        <h3 className="title">All Of Me</h3>
      </div>
      <button className="playButton">
        <SkipBack />
      </button>
      {!isPlaying ? (
        <button className="playButton" onClick={playingButton}>
          <PlayCircle />
        </button>
      ) : (
        <button className="playButton" onClick={playingButton}>
          <PauseIcon />
        </button>
      )}
      <button className="playButton">
        <SkipForward />
      </button>
    </div>
  );
};

export default Listen;
