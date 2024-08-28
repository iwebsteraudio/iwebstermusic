import React from "react";

interface FooterProps {
    className?: string;
}

const Footer:React.FC<FooterProps> = ({className}) =>{
    return (
        <footer className={className}>
            <p>07913111628 for enquiries</p>
        </footer>
    )
}

export default Footer;