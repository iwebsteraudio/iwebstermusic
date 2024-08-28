import React, { useEffect, useState } from "react";
import { fetchYouTube } from "../../api/Api";

type VideosProps = {
  id: string;
};

const VideoElement = (props: VideosProps): React.ReactElement<{}> => {
  return (
    <div className="mx-5">
      <iframe
        width="450 height=280"
        src={`http://www.youtube.com/embed/${props.id}`}
      ></iframe>
    </div>
  );
};

const Videos = (): React.ReactElement<{}> => {
  const [videoData, setVideoData] = useState<any>([]);

  useEffect(() => {
    fetchYouTube()
      .then((data) => {
        setVideoData(transformData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex video-cont justify-between">
      {videoData.length
        ? videoData.map((videoId: string, idx: number) => (
            <VideoElement key={idx} id={videoId} />
          ))
        : []}
    </div>
  );
};

const transformData = (data: any[]) => {
  return data.map((item: any) => {
    return item.contentDetails.videoId;
  });
};

export default Videos;
