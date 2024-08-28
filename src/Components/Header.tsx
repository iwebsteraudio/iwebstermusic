import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-stone-200 sticky top-0 z-40 flex items-center justify-evenly border-b-4 border-gray-950 p-8">
      <div className="flex flex-col">
        <Link to="/" className="font-righteous text-4xl">iwebstermusic</Link>
        <h2 className="text-center">acoustic guitarist, bass-player and singer</h2>
      </div>
      
    </header>
  );
};

export default Header;
