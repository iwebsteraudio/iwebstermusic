import Logo from "./Logo";

const Header = ()=>{
    return (
        <header className="bg-dark-bckground sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8">
            <Logo />
            <h1 className="text">iwebstermusic</h1>
            <h2>acoustic guitarist and singer</h2>
        </header>
    )
}

export default Header;