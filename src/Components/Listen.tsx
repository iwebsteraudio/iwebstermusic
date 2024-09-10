import { PlayCircle, SkipBack, SkipForward, PauseIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { fetchAllSongs } from "../../api/Api";

interface Song {
  song_id?: string;
  title: string;
  decade: string;
  genre: string;
  path?: string;
}

const Listen: React.FC = () => {
  const [songData, setSongData] = useState<Song[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currTime, setCurrTime] = useState<{ min: string; sec: string }>({
    min: "00",
    sec: "00",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number | undefined>(undefined);

  // Filters for songs with a valid path to an audio file
  const songs: Song[] = songData.filter((song) => song.path);

  // useSound Hook  to play songs
  const [play, { pause, stop, duration, sound }] = useSound(
    songs[trackIndex]?.path || "",
    {
      onend: () => {
        setIsPlaying(false);
      },
    }
  );

  const formatTime = (num: number) => String(num).padStart(2, "0");

  // calculate song duration
  const sec = (duration ?? 0) / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
    min: formatTime(min),
    sec: formatTime(secRemain),
  };

  // Fetch songs on initial render
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await fetchAllSongs();
        setSongData(data);
      } catch (err) {
        console.log("Failed to fetch songs", err);
        setErr("Error fetching songs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Handle skiptrack, stops previous track when trackIndex Changes
  useEffect(() => {
    if (sound) {
      stop();
      setIsPlaying(false);
    }
  }, [trackIndex, sound, stop]);

  // Update current time each second while track plays
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        const seekPosition = sound.seek([]) as number;
        setSeconds(seekPosition);
        const min = Math.floor(seekPosition / 60);
        const sec = Math.floor(seekPosition % 60);
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

  if (isLoading) {
    return (
      <p className="rounded-3xl bg-white opacity-90 w-1/4 max-w-600px m-4 mx-auto pb-8 border border-black">
        Loading Songs.
      </p>
    );
  }

  if (err) {
    return <div>{err}</div>;
  }

  return (
    <div className="rounded-3xl bg-white opacity-90 w-1/4 max-w-600px m-4 mx-auto pb-8 border border-black">
      <h2 className="p-8">Playing Now:</h2>
      <div>
        <h3 className="title font-righteous pb-8">{songs[trackIndex].title}</h3>
      </div>
      <button
        className="playButton hover:bg-stone-200 rounded-lg p-8"
        onClick={prevTrack}
      >
        <SkipBack />
      </button>
      {!isPlaying ? (
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={playingButton}
        >
          <PlayCircle />
        </button>
      ) : (
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={playingButton}
        >
          <PauseIcon />
        </button>
      )}
      <button
        className="playButton hover:bg-stone-200 rounded-lg p-8"
        onClick={nextTrack}
      >
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
        max={sec || 0}
        defaultValue="0"
        value={seconds || 0}
        className="timeline"
        onChange={(e) => {
          sound.seek([Number(e.target.value)]);
        }}
      />
    </div>
  );
};

export default Listen;
