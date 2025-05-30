import React, { useState, useEffect } from "react";
import { fetchMp3s } from "../../../api/Api";
import PlayerComponent from "./PlayerComponent";
import { SongMp3 } from "utils/types";

const Listen: React.FC = () => {
  const [songData, setSongData] = useState<SongMp3[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch songs on initial render
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await fetchMp3s();
        setSongData(data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
        setErr("Error fetching songs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (isLoading) {
    return (
      <p className="rounded-3xl bg-white opacity-90 w-1/4 max-w-600px m-4 mx-auto p-8 border border-black">
        Loading Songs...
      </p>
    );
  }

  if (err) {
    return <div>{err}</div>;
  }

  const songPath = songData[trackIndex]?.url.replace('.mp3', '.m4a') || "";

  return (
    <div className="relative isolate  bg-white opacity-90 max-w-3xl mx-auto text-xs p-5 sm:p-8 mt-10">
      <h2 className="p-2 sm:p-4 text-base sm:text-sm">Now Playing:</h2>
      <div>
        <h3 className="title font-righteous text-lg break-words sm:text-xl text-center">
          {songData[trackIndex]?.fileName.split(".")[0].split("_").join(" ")}
        </h3>
        <PlayerComponent
          key={songPath} // Force reinitialization on songPath change
          songPath={songPath}
          onEnd={() => setIsPlaying(false)}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songData={songData}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
      </div>
    </div>
  );
};

export default Listen;
