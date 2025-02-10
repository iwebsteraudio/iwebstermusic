import React from "react";
import Contact from "./Contact";
import Listen from "./Listen/Listen";

const Home: React.FC = () => {
  return (
    <>
      <section className="relative flex items-center flex-col">
        <div className="relative isolate rounded-3xl bg-white opacity-90 max-w-3xl mx-auto">
          {/* Responsive Video Wrapper */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl min-h-[400px] sm:min-h-[500px] aspect-video border-4 border-indigo-300 bg-white opacity-90 rounded-3xl p-5">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/uGpb0HYfMuc?si=xWa_38ohkm9p9Wsy"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
        <div id="listen" className="bg-transparent pt-8">
          <Listen />
        </div>
      </section>
      <section className="relative flex mt-20 justify-center items-center w-full ">
        <div className="relative w-full sm:w-3/4 md:w-1/2 h-auto sm:h-1/2 mx-5 mb-20">
          <img
            className="object-cover w-full h-full rounded-lg border-4 border-indigo-900"
            src="/assets/img/MeWithStrat.JPG"
            alt="Ian Webster playing his fender strat at home"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white font-righteous text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ">
              Ian Webster - Guitarist and Singer
            </h2>
          </div>
        </div>
      </section>

      <Contact />

      <section className="shadow-md mt-10 p-8 rounded-md text-1 font-monaSans bg-white border-4 border-indigo-900">
        <h3 className="font-extrabold mb-5">
          CREATE THE SOUNDTRACK TO YOUR EVENT
        </h3>
        <p className="font-normal">
          Whether you're hosting a wedding, a birthday or simply a live event at
          a bar, café or pub, you want someone who can cater for all ages.
        </p>
        <p className="font-normal">
          You can choose your own playlist from my extensive and ever growing
          repertoire. You can suggest favourites for me to bring my own unique
          style to. From folk, indie, Rock and Pop such as the Beatles, the
          Animals, Spandau Ballet or the Killers. From Yazoo to Coldplay and
          Neil Young. I can even bring a drum-machine and a looper pedal to
          create a one-man-band!
        </p>
      </section>
    </>
  );
};

export default Home;
