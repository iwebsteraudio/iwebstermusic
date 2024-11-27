import React, { useEffect, useState } from "react";
import { fetchYouTube } from "../../api/Api";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

type VideoElementProps = {
  id: string;
};
const VideoElement: React.FC<VideoElementProps> = ({ id }) => {
  return (
    <div className="relative pb-[56.25%] m-10 h-0 overflow-hidden mx-auto video-container">
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

const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="custom-arrow custom-prev-arrow"
    style={{
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 10,
    }}
  >
    <ChevronLeft size={90} color="white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="custom-arrow custom-next-arrow"
    style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 10,
    }}
  >
    <ChevronRight size={90} color="white"/>
  </button>
);

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
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  return (
    <div className="relative">
      {err && <p className="text-red-500">{err}</p>}
      {videoData.length > 0 ? (
        <div className="flex justify-center relative">
          <Slider {...settings} className="w-[80%]">
            {videoData.map((videoId: string, idx: number) => (
              <VideoElement key={idx} id={videoId} />
            ))}
          </Slider>
        </div>
      ) : (
        !err && <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Videos;
