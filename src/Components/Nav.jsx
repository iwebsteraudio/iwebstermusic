import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/listen">Listen</NavLink>
      <NavLink to="/videos">Videos</NavLink>
      <NavLink to="/set-list">Set-List</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );
};

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleNavBar =()=>{
        setIsOpen(!isOpen)
    }
  return (
    <nav className="items-center w-1/3 ">
      <div className=" hidden md:flex justify-between   border-b border-gray-500 p-2">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <button onClick={toggleNavBar}>{isOpen ? <X /> : <Menu /> }</button>
      </div>
    </nav>
  );
};

export default Nav;
