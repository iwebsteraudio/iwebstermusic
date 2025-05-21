import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import SetList from "./Components/SetList/SetList";
import Videos from "./Components/Videos";
import About from "./Components/About";
import ErrorPage from "./Components/ErrorPage";
import bgImage from "../assets/img/WeShallOvercome.jpg"

const App: React.FC = () => {
console.log(bgImage)
  return (
    <section>
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed`}
        style={{
           backgroundImage: `url(${bgImage})`,
           backgroundPosition: "center 30%",
          }}
      ></div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-0"></div> {/* Ensure z-index is 0 */}

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen"> {/* Ensure z-index is higher */}
        <Header />
        <Nav />
        <main className="relative z-20 flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />       
            <Route path="/contact" element={<Contact />} />
            <Route path="/set-list" element={<SetList />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer className="border-gray-500 bg-stone-200 mt-auto p-8 border-t-4" />
      </div>
    </div>
    </section>
  );
};

export default App;
