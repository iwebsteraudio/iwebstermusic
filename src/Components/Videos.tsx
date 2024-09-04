import React, { useEffect, useState } from "react";
import { fetchYouTube } from "../../api/Api";
import Slider from "react-slick";

type VideoElementProps = {
  id: string;
};

const VideoElement: React.FC<VideoElementProps> = ({ id }) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden mx-auto">
      <iframe
        className="rounded-lg absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {err && <p className="text-red-500">{err}</p>}
      {videoData.length > 0 ? (
        <Slider {...settings} className="w=[80%]">
          {videoData.map((videoId: string, idx: number) => (
            <VideoElement key={idx} id={videoId} />
          ))}
        </Slider>
      ) : (
        !err && <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Videos;
