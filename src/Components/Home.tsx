import React from "react";
import Contact from "./Contact";
import Listen from "./Listen/Listen";

const Home: React.FC = () => {
  return (
    <>
      <section className="relative flex justify-center items-center w-full">
        <div className="blur-border w-1/2 h-1/2 mx-5 mb-20">
          <img
            className="object-cover w-full h-full"
            src="/assets/img/MeWithStrat.JPG"
            alt="Ian Webster playing his fender strat at home"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white font-righteous text-4xl font-bold">
              Ian Webster - Guitarist and Singer
            </h2>
          </div>
        </div>
      </section>

      <div id="listen" className="bg-transparent pt-8">
        <Listen />
      </div>
      <div id="contact" className="mt-20">
        <Contact />
      </div>

      <section className="shadow-md mt-20 mb-96 p-8 rounded-md text-1 font-monaSans bg-white">
        <h3 className="font-extrabold">CREATE THE SOUNDTRACK TO YOUR EVENT</h3>
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
