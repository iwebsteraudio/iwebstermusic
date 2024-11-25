import React, {useEffect, useState} from "react";
import PlayerControls from "./PlayerControls";
import TimeDisplay from "./TimeDisplay";
import useSound from "use-sound";



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
    onEnd,
    isPlaying,
    setIsPlaying,
    songData,
    setTrackIndex,
  }) => {
    const [currTime, setCurrTime] = useState<{ min: string; sec: string }>({
      min: "00",
      sec: "00",
    });
    const [seconds, setSeconds] = useState<number>(0);
  
    // Set up useSound
    const [play, { pause, stop, duration, sound }] = useSound(songPath, {
      format: ["mp3"],
      onend: onEnd,
    });
  
    // Update current time each second while the track plays
    useEffect(() => {
      if (!sound) return;
  
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
    }, [sound]);
  
    const playingButton = () => {
      if (isPlaying) {
        pause();
        setIsPlaying(false);
      } else {
        play();
        setIsPlaying(true);
      }
    };
  
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
              totalTime={{
                min: String(Math.floor((duration ?? 0) / 60000)).padStart(2, "0"),
                sec: String(
                  Math.floor(((duration ?? 0) % 60000) / 1000)
                ).padStart(2, "0"),
              }}
              seconds={seconds}
              onSeek={(e) => sound?.seek(Number(e.target.value))}
            />
          </>
        )}
      </>
    );
  };

  export default PlayerComponent;