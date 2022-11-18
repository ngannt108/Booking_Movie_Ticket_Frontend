import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./Movies/AllMovies";
import AddMovieForm from "../../Components/Admin/AddMovieForm/AddMovieForm";
import Showtimes from "./Showtimes/Showtimes";
import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import EditMovieModal from "../../Components/Admin/EditMovieModal/EditMovieModal";
import AllMoviesTest from "./Movies/AllMoviesTest";
const MenuAdmin = React.memo(() => (
  <div className="vertical-menu">
    <NavLink defaultValue end to="/Admin">
      Danh sách phim
    </NavLink>
    <NavLink end to="/Admin/movie">
      Tạo phim mới
    </NavLink>
    <Link to="#">Phim được yêu thích</Link>
  </div>
));

export default function AdminMovies() {
  return (
    // <div className="admin-page">
    //   <HeaderAdmin />
    <div className="general" style={{ marginTop: "1em" }}>
      {/* <div className="vertical-menu">
        <NavLink defaultValue end to="/Admin">
          Tất cả phim
        </NavLink>
        <NavLink end to="/Admin/movie">
          Tạo phim mới
        </NavLink>
        <Link to="#">Phim được yêu thích</Link>
      </div> */}
      <MenuAdmin />
      <Routes>
        <Route index path="/" element={<AllMovies />} />
        <Route path="/movie" element={<AddMovieForm />} />
        <Route path="/:slug/showtimes" element={<Showtimes />} />

        <Route path="/edit" element={<EditMovieModal />} />
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
      //{" "}
    </div>
  );
}
