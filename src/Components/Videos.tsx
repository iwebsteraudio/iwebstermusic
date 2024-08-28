import React, { useEffect, useState } from "react";
import { fetchYouTube } from "../../api/Api";

type VideosProps = {
  id: string;
};

const VideoElement = (props: VideosProps): React.ReactElement<{}> => {
  return (
    <div className="mx-5 p-8">
      <iframe
        width="450"
        height="280"
        src={`http://www.youtube.com/embed/${props.id}`}
        frameBorder="5"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const Videos = (): React.ReactElement<{}> => {
  const [videoData, setVideoData] = useState<any>([]);

  const [err, setErr] = useState();

  useEffect(() => {
    fetchYouTube()
      .then((data) => {
        setVideoData(transformData(data));
      })
      .catch((err) => {
        console.log("Failed to fetch Youtube Videos", err);
        setErr(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center p-8 video-cont justify-between">
      {videoData.length
        ? videoData.map((videoId: string, idx: number) => (
            <VideoElement key={idx} id={videoId} />
          ))
        : []}
    </div>
  );
};

const transformData = (data: any) => {
  return data.map((item: any) => {
    return item.id.videoId;
  });
};

export default Videos;
