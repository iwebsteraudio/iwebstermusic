import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Nav from "./Components/Nav";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home className="py-8 px-8 my-8 mx-8" />} />
      </Routes>
    </>
  );
}

export default App;
