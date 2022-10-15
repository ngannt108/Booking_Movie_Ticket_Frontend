import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Homepage/Home";
import ShowingMovies from "./Components/ShowingMovies/ShowingMovies";
import ComingMovies from "./Components/ComingMovies/ComingMovies";
import Theaters from "./Components/Theaters/Theaters";
import LogIn from "./Components/LogIn/LogIn";
import AllMovies from "./Page/Admin/Movies/AllMovies";
import AddMovieForm from "./Components/Admin/AddMovieForm/AddMovieForm";
import Showtimes from "./Page/Admin/Showtimes/Showtimes";

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
          <Route path="/Login" element={<LogIn />} />

          <Route path="/Admin" element={<AllMovies />} />
          <Route path="/Admin/movie" element={<AddMovieForm />} />
          <Route path="/Admin/:slug/showtimes" element={<Showtimes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
