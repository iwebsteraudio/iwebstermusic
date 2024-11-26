import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isPlaying) {
      stop();
      sound?.seek(seconds);
      play();
    }
  }, [songPath, sound, isPlaying, play, stop]);

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

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      sound?.seek(seconds);
      play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    stop();
    setTrackIndex((prevIndex) => (prevIndex + 1) % songData.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    stop();
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + songData.length) % songData.length
    );
    setIsPlaying(true);
  };

  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    sound?.seek(seconds);
    setSeeking(false);
  };

  const handleSeekChange = (value: number) => {
    setSeconds(value);
    sound?.seek(value);
  };

  const handleSongSelect = (index: number) => {
    stop();
    setTrackIndex(index);
    setIsPlaying(true);
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
