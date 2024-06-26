import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App flex flex-col items min-h-screen">
      <Header />
      <div className="flex-grow">
        <Nav />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer className="p-8 border-t border-gray-500" />
    </div>
  );
}

export default App;
