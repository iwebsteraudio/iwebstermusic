import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-20 mx-auto w-full flex items-center justify-between border-b border-gray-500 p-8">
      <Logo />
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold">iwebstermusic</h1>
        <h2 className="text-base">acoustic guitarist and singer</h2>
      </div>
    </header>
  );
};

export default Header;
