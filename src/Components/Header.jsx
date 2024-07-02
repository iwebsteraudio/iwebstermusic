import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-20 mx-auto w-full flex items-center justify-between border-b border-gray-500 p-8">
      <Logo />
      <div className="flex flex-col items-start">
        <Link to="/" className="font-righteous text-4xl item-end">iwebstermusic</Link>
        <h2 className="text-base">acoustic guitarist and singer</h2>
      </div>
    </header>
  );
};

export default Header;
