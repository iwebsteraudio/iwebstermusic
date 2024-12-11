import React from "react";
import { Link } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Header: React.FC = () => {
  return (
    <header className="relative bg-stone-200 z-40 flex items-center justify-evenly border-b-4 border-gray-950 p-8">
      {/* Animation in the background */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 -z-10">
        <Audio
          height="100"
          width="100"
          color="blue"
          ariaLabel="audio-playing-animation"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
      {/* Content */}
      <div className="flex flex-col text-center">
        <Link to="/" className="font-righteous text-5xl relative z-10">
          iwebstermusic
        </Link>
        <h2 className="font-monaSans italic relative z-10">
          acoustic guitarist, bass-player and singer
        </h2>
      </div>
    </header>
  );
};

export default Header;
