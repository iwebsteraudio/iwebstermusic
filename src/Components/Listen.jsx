import { PlayCircle, SkipBack, SkipForward, PauseIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import songsData from "../../public/songsDatabase.json";



const Listen = () => {
  const songs = songsData.songs.filter(song => song.path);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState();
  const [play, { pause, stop, duration, sound }] = useSound(
    songs[trackIndex].path,
    {
      onend: () => {
        setIsPlaying(false);
      },
    }
  );
  
  const formatTime = (num) => String(num).padStart(2, "0");
  const sec = duration / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
    min: formatTime(min),
    sec: formatTime(secRemain),
  };

  useEffect(() => {
    if (sound) {
      stop();
      setIsPlaying(false);
    }
  }, [trackIndex, play, stop]);



  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min: formatTime(min),
          sec: formatTime(sec),
        });
      }
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
    pause();
    setIsPlaying(false);
    setTrackIndex((prevIndex) => (prevIndex + 1) % songs.length);
    play();
    setIsPlaying(true);
  };

  const prevTrack = () => {
    pause();
    setIsPlaying(false);
    setTrackIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  return (
    
      <div className="rounded-10px bg-white w-1/4 max-w-600px m-4 mx-auto pb-8 border border-black">
        <h2 className="p-8">Playing Now:</h2>
        <div>
          <h3 className="title pb-8">{songs[trackIndex].title}</h3>
        </div>
        <button className="playButton hover:bg-stone-200 rounded-lg p-8" onClick={prevTrack}>
          <SkipBack />
        </button>
        {!isPlaying ? (
          <button className="playButton hover:bg-stone-200 rounded-lg p-8" onClick={playingButton}>
            <PlayCircle />
          </button>
        ) : (
          <button className="playButton hover:bg-stone-200 rounded-lg p-8" onClick={playingButton}>
            <PauseIcon />
          </button>
        )}
        <button className="playButton hover:bg-stone-200 rounded-lg p-8" onClick={nextTrack}>
          <SkipForward />
        </button>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
    
  );
};

export default Listen;
