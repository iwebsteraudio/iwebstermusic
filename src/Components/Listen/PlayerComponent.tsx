import React, { useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import TimeDisplay from "./TimeDisplay";
import useSound from "use-sound";
import SongList from "./SongList";
import VolumeSlider from "./VolumeSlider";
import { SongMp3 } from "utils/types";

interface PlayerComponentProps {
  songPath: string;
  onEnd: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  songData: SongMp3[];
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
  const [volume, setVolume] = useState<number>(1);

  // Set up useSound
  const [play, { pause, stop, duration, sound }] = useSound(songPath, {
    format: ["mp3"],
    volume: 1,
    onend: () => {
      setTrackIndex((prevIndex) => (prevIndex + 1) % songData.length);
      setIsPlaying(false);
    },
  });

  // UPDATE VOLUME USEEFFECT

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  // Update current time each second while the track plays
  const durationInSeconds = duration ? duration / 1000 : 0;

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

  // VOLUM SLIDER HANDLER
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  // CHANGING TRACKS

  const nextTrack = () => {
    stop();
    setIsPlaying(false);
    setTrackIndex((prevIndex) => (prevIndex + 1) % songData.length);
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
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={playingButton}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
        sound={sound}
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
      <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange} />
    </>
  );
};

export default PlayerComponent;
