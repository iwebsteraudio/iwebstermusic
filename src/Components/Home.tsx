import React from "react";
import Contact from "./Contact";

const Home: React.FC = () => {
  return (
    <>
      <section className="shadow-md mt-20 mb-96 p-8 rounded-md text-1 font-monaSans bg-white">
        <img
          className="rounded-full object-cover h-[30rem] w-1/3 float-left mr-5 mb-20"
          src="/assets/img/MeAtWineandWallopColour.png"
          alt="Ian Webster at the Wine and Wallop bar, playing acoustic guitar"
        ></img>
        <div className="w-2/3 ml-20">
        <p className="pb-8 ">
          Hello! I'm &nbsp;
          <b>Ian Webster,</b>
          &nbsp; an acoustic guitarist and singer based in Greater Manchester.
          I'm available for weddings and events across the UK.
        </p>
        <p className="pb-8">
          I play a wide variety of songs and am comfortable taking requests and
          tailoring my shows to the specific tastes of the audience.
        </p>

        <p className="p-8">
          I moved out from Middlesbrough in 2010 with a dream to come to
          Manchester and play music.&nbsp; Since moving, I've learned to sing, I
          learned to produce music at Salford University (the learning never
          stops!). &nbsp; I've worked in kitchens, in offices, on sound-stages
          in woods. After being made redundant in 2023, I decided that life is
          far too short to leave those dreams on hold and now I'm making music
          my living!
        </p>
        <p className="p-8">
          {" "}
          My dream is to play weddings, events and bars. To entertain crowds and
          have them sing along. To bring the party&nbsp; and give people a
          special night.
        </p>
        <p className="p-8">
          {" "}
          I have my own PA system and lights (where needed) and am looking
          forward to filling my diary for 2025!
        </p>
        <a href="#contact" className="nav-link hover:underline hover:bg-stone-200 rounded px-20 py-2">
          Contact Me
        </a>
        </div>
      </section>

      <div id="contact">
        <Contact />
      </div>

      <section className="shadow-md mt-20 mb-96 p-8 rounded-md text-1 font-monaSans bg-white">
        <h3 className="font-extrabold">CREATE THE SOUNDTRACK TO YOUR EVENT</h3>
        <p className="font-normal">Whether you're hosting a wedding, a birthday or simply a live event at a bar, café or pub, you want someone who can cater for all ages.
        </p>
        <p className="font-normal">You can choose your own playlist from my extensive and ever growing repertoire. You can suggest favourites for me to bring my own
            unique style to. From folk, indie, Rock and Pop such as the Beatles, the Animals, Spandau Ballet or the Killers. From Yazoo to Coldplay and Neil Young.
            I can even bring a cajon and a looper pedal to create a one-man-band!
        </p>
      </section>
    </>
  );
};

export default Home;
