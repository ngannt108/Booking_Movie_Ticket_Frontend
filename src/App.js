import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Homepage/Home";
import Theaters from "./Components/Theaters/Theaters";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Movies from "./Components/Movies/Movies";
import Booking from "./Components/Booking/Booking";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Admin from "./Page/Admin/Admin";

function App() {

  return (

    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Content động */}
          <Route path="/" element={<Home />} />
          <Route path="/Admin/*" element={<Admin />} />
          {/* <Route path="/Admin/movie" element={<AddMovieForm />} />
          <Route path="/Admin/:slug/showtimes" element={<Showtimes />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Movie/*" element={<Movies />}></Route>
          <Route path="/Theaters" element={<Theaters />} />
          <Route path="/Booking" element={<Booking />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
