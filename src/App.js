import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Homepage/Home";
import ShowingMovies from "./Components/ShowingMovies/ShowingMovies";
import ComingMovies from "./Components/ComingMovies/ComingMovies";
import Theaters from "./Components/Theaters/Theaters";
import AllMovies from "./Page/Admin/Movies/AllMovies";
import AddMovieForm from "./Components/Admin/AddMovieForm/AddMovieForm";
import Showtimes from "./Page/Admin/Showtimes/Showtimes";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import "./App.css";

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
          <Route path="/Admin" element={<AllMovies />} />
          <Route path="/Admin/movie" element={<AddMovieForm />} />
          <Route path="/Admin/:slug/showtimes" element={<Showtimes />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          {/* <Route path="/Admin" element={<Admin />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
