import React from "react";
import { NavLink } from "react-router-dom";

interface FooterProps {
    className?: string;
}

const Footer:React.FC<FooterProps> = ({className}) =>{
    return (
        <footer className={className}>
            <p>07913-111-628 for enquiries or...</p>
            <NavLink to="/contact" className="nav-link hover:underline hover:bg-stone-200 rounded m-5">Contact Me</NavLink>
        </footer>
    )
}

export default Footer;