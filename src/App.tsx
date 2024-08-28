import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Listen from "./Components/Listen";
import About from "./Components/About";
import Contact from "./Components/Contact";
import SetList from "./Components/SetList";
import Videos from "./Components/Videos";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <div
        className={`fixed inset-0 bg-[url('../assets/img/LivePic.jpg')] bg-cover bg-center bg-no-repeat bg-fixed`}
        style={{ backgroundPositionY: 120 }}
      ></div>
      {/* Overlay */}
      <div className="overlay inset-0 bg-black bg-opacity-60 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <Nav />
        <main className="flex-grow p-16 px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/set-list" element={<SetList />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </main>
        <Footer className="border-gray-500 bg-stone-200 mt-auto p-8 border-t-4" />
      </div>
    </div>
  );
}

export default App;
