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

  // Fetch songs on initial render
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await fetchAllSongs();
        console.log(data);
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

  // Filters for songs with a valid path to an audio file
  const songs: Song[] = songData.filter((song) => song.path);

  // Check if the song path is ready before initializing useSound
  const songPath = songs[trackIndex]?.path || null;

  // useSound Hook  to play songs

  const [play, { pause, stop, duration, sound }] = useSound(songPath || "assets/songs/ReadMyMind.wav", {
    onend: () => {
      setIsPlaying(false);
    },
  });

  const formatTime = (num: number) => String(num).padStart(2, "0");

  // calculate song duration
  const sec = (duration ?? 0) / 1000;
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  const time = {
    min: formatTime(min),
    sec: formatTime(secRemain),
  };

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
      <p className="rounded-3xl bg-white opacity-90 w-1/4 max-w-600px m-4 mx-auto p-8 border border-black">
        Loading Songs.
      </p>
    );
  }

  if (err) {
    return <div>{err}</div>;
  }

  return (
    <div className="rounded-3xl bg-white opacity-90 w-1/4 max-w-600px m-4 mx-auto pb-8 border-4 border-blue-600 text-xs">
      <h2 className="p-8">Playing Now:</h2>
      <div>
        <h3 className="title font-righteous text-2xl pb-8">
          {songs[trackIndex].title}
        </h3>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-evenly text-xs">
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={prevTrack}
          disabled={!sound}
        >
          <SkipBack size={30} className="mb-2" />
          <span>prev</span>
        </button>
        {!isPlaying ? (
          <button
            className="playButton hover:bg-stone-200 rounded-lg p-8"
            onClick={playingButton}
            disabled={!sound}
          >
            <PlayCircle size={60} strokeWidth={1.2} className="mb-2" />
            <span>play</span>
          </button>
        ) : (
          <button
            className="playButton hover:bg-stone-200 rounded-lg p-8"
            onClick={playingButton}
            disabled={!sound}
          >
            <PauseIcon size={60} strokeWidth={1.2} className="mb-2" />
            <span>pause</span>
          </button>
        )}
        <button
          className="playButton hover:bg-stone-200 rounded-lg p-8"
          onClick={nextTrack}
          disabled={!sound}
        >
          <SkipForward size={30} className="mb-2" />
          <span>next</span>
        </button>
      </div>

      {/* Time Display */}
      {duration ? (
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Seek Bar */}

      <input
        type="range"
        min="0"
        max={sec || 0}
        value={seconds || 0}
        className="timeline"
        onChange={(e) => {
          sound.seek([Number(e.target.value)]);
        }}
        disabled={!sound}
      />
      {duration && (
        <p>
          Song Length: {time.min}:{time.sec}
        </p>
      )}
    </div>
  );
};

export default Listen;
