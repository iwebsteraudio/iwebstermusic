import React, { useEffect, useState, useRef } from "react";
import PlayerControls from "./PlayerControls";
import TimeDisplay from "./TimeDisplay";
import useSound from "use-sound";
import SongList from "./SongList";

interface Song {
  fileName: string;
  url: string;
}

interface PlayerComponentProps {
  songPath: string;
  onEnd: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  songData: Song[];
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerComponent: React.FC<PlayerComponentProps> = ({
  songPath,
  isPlaying,
  setIsPlaying,
  songData,
  trackIndex,
  setTrackIndex,
}) => {
  const [currTime, setCurrTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
  const [seconds, setSeconds] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);

  // Set up useSound
  const [play, { pause, stop, duration, sound }] = useSound(songPath, {
    format: ["mp3"],
    onend: () => {
      setTrackIndex((prevIndex) => (prevIndex + 1) % songData.length);
      setIsPlaying(false);
    },
  });

  const durationInSeconds = duration ? duration / 1000 : 0;

  // Update current time each second while the track plays
  useEffect(() => {
    if (!sound || seeking) return;

    const interval = setInterval(() => {
      const seekPosition = sound.seek() as number; // Get current position
      setSeconds(seekPosition);

      const min = Math.floor(seekPosition / 60);
      const sec = Math.floor(seekPosition % 60);
      setCurrTime({
        min: String(min).padStart(2, "0"),
        sec: String(sec).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sound, seeking]);

  // Stops on navigation away from listen app
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // PLAY/PAUSE

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  // CHANGING TRACKS


  const nextTrack = () => {
    stop();
    setIsPlaying(false);
    setTrackIndex((prevIndex) => (prevIndex + 1) % songData.length);
    play()
  };

  const prevTrack = () => {
    stop();
    setIsPlaying(false);
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + songData.length) % songData.length
    );
  
  };

  const handleSongSelect = (index: number) => {
    stop();
    setIsPlaying(false);
    setTrackIndex(index);
  };

  // SEEK BAR SELECTION

  const handleSeekStart = () => {
    stop();
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    sound?.seek(seconds);
    setSeeking(false);
    if (isPlaying) {
      play();
    }
  };

  const handleSeekChange = (value: number) => {
    setSeconds(value);
    sound?.seek(value);
  };

  return (
    <>
      {!sound ? (
        <p>Initializing Web Player</p>
      ) : (
        <>
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={playingButton}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            disabled={!sound}
          />
          <TimeDisplay
            currTime={currTime}
            totalTime={durationInSeconds}
            seconds={seconds}
            onSeek={handleSeekChange}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
          />
          <SongList
            songData={songData}
            trackIndex={trackIndex}
            onSongSelect={handleSongSelect}
          />
        </>
      )}
    </>
  );
};

export default PlayerComponent;
