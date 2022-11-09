import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./Movies/AllMovies";
import AddMovieForm from "../../Components/Admin/AddMovieForm/AddMovieForm";
import Showtimes from "./Showtimes/Showtimes";
import "../../App.css";
import HeaderAdmin from "./Header/HeaderAdmin";
import { Link, NavLink } from "react-router-dom";
import EditFormModal from "../../Components/Admin/EditFormModal/EditFormModal";


export default function AdminMovies() {
  return (
    // <div className="admin-page">
    //   <HeaderAdmin />
    <div className="general" style={{ marginTop: "1em" }}>
      <div className="vertical-menu">
        <NavLink end to="/Admin">
          Tất cả phim
        </NavLink>
        <NavLink end to="/Admin/movie">
          Tạo phim mới
        </NavLink>
        <Link to="#">Phim được yêu thích</Link>
      </div>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/movie" element={<AddMovieForm />} />
        <Route path="/:slug/showtimes" element={<Showtimes />} />

        <Route path="/edit" element={<EditFormModal />} />
      </Routes>
      {/* </div> */}
      {/* <div className="vertical-menu">
              <Link to="#" className="active">
                  Tất cả phim
              </Link>
              <NavLink end to="/Admin/movie">
                  Tạo phim mới
              </NavLink>
              <Link to="#">Phim được yêu thích</Link>
          </div>  */}
    // </div>
  );
}
