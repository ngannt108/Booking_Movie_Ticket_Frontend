import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Homepage/Home";
import ShowingMovies from "./Components/ShowingMovies/ShowingMovies";
import ComingMovies from "./Components/ComingMovies/ComingMovies";
import Theaters from "./Components/Theaters/Theaters";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Content động */}
          <Route path="/" element={<Home />} />
          <Route path="/ShowingMovies" element={<ShowingMovies />} />
          <Route path="/ComingMovies" element={<ComingMovies />} />
          <Route path="/Theaters" element={<Theaters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
