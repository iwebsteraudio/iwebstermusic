import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavLinks: React.FC  = () => {
  return (
    <>
      {/* <NavLink to="/login" className={"nav-link hover:underline hover:bg-stone-200 rounded px-4 py-2"}>
        Login
      </NavLink> */}
      <NavLink to="/" className={"nav-link font-monaSans hover:underline hover:bg-stone-200 rounded px-40 py-2"}>
      Home
      </NavLink>
      <NavLink to="/listen" className={"nav-link font-monaSans hover:underline hover:bg-stone-200 rounded px-40 py-2"}>
        Listen
      </NavLink>
      <NavLink to="/videos" className={"nav-link hover:underline hover:bg-stone-200 rounded px-40 py-2"}>
        Videos
      </NavLink>
      <NavLink to="/set-list" className={"nav-link hover:underline hover:bg-stone-200 rounded px-40 py-2"}>
        SetList
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav-bar bg-white hover:bg-stone-50 z-20">
      <div className="hidden md:flex justify-evenly border-b-4 border-x border-gray-950 py-2">
        <NavLinks />
      </div>
      <div className="md:hidden p-2">
        <button onClick={toggleNavBar} className="focus:outline-none">
          {isOpen ? <X /> : <Menu />}
        </button>
        {isOpen && (
          <div className="flex flex-col border-t border-gray-500 p-2">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
