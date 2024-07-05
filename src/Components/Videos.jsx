const Videos = () => {
  return (
    <div className="video-container flex flex-col items-center">
       <div className="w-full md:w-2/3 lg:w-1/2 aspect-w-16 aspect-h-9 mb-8">
          <iframe
        className="shadow-md rounded-md m-8"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/vLKuXY503I8?si=Z_gkWtgCxy-uBIKz"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <iframe
        className="shadow-md rounded-md m-8"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/oEOws6OODX8?si=v9nntc_FCN7_m931"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
         </div>
    </div>
  );
};

export default Videos;
