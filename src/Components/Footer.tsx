import React from "react";
import { NavLink } from "react-router-dom";

interface FooterProps {
    className?: string;
}

const Footer:React.FC<FooterProps> = ({className}) =>{
    return (
        <footer className={className}>
            <p>07913111628 for enquiries or...</p>
            <NavLink to="/contact">Contact Me</NavLink>
        </footer>
    )
}

export default Footer;