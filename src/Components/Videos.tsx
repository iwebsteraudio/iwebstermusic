import React, { useEffect, useState } from "react";
import { fetchYouTube } from "../../api/Api";

type VideoElementProps = {
  id: string;
};

const VideoElement: React.FC<VideoElementProps> = ({ id }) => {
  return (
    <div className="relative pb-[56.25%] m-8">
      <iframe
        className="rounded-lg absolute top-0 left-0 border-2 w-full h-full border-violet-300"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={id}
      ></iframe>
    </div>
  );
};

const Videos: React.FC = () => {
  const [videoData, setVideoData] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchYouTube();
        const transformedData = transformData(data);
        setVideoData(transformedData);
      } catch (err) {
        console.log("Failed to fetch Youtube Videos", err);
        setErr("Error fetching videos. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const transformData = (data: any[]): string[] => {
    return data.map((item: any) => item.id.videoId);
  };

  return (
    <div className="relative">
      {err && <p className="text-red-500">{err}</p>}
      {videoData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videoData.map((videoId: string, idx: number) => (
            <VideoElement key={idx} id={videoId} />
          ))}
        </div>
      ) : (
        !err && <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Videos;
