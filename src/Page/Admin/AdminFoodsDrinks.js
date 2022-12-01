import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./Movies/AllMovies";
import AddMovieForm from "../../Components/Admin/AddMovieForm/AddMovieForm";
import Showtimes from "./Showtimes/Showtimes";
import "../../App.css";
import HeaderAdmin from "./Header/HeaderAdmin";
import { Link, NavLink } from "react-router-dom";
import AllFoodDrinks from "./FoodDrinks/AllFoodDrinks";
import EditMovieModal from "../../Components/Admin/EditMovieModal/EditMovieModal";
import AddFDForm from "../../Components/Admin/AddFDForm/AddFDForm";

const MenuFDAdmin = React.memo(() => (
  <div className="vertical-menu">
    <NavLink end to="/Admin/Foods">
      Danh sách combo
    </NavLink>
    <NavLink end to="/Admin/Foods/Add">
      Tạo combo mới
    </NavLink>
  </div>
));
export default function AdminFoodDrinks() {
  return (
    // <div className="admin-page">
    /* <HeaderAdmin /> */
    <div className="general" style={{ marginTop: "1em" }}>
      <MenuFDAdmin />
      <Routes>
        <Route path="/Foods" element={<AllFoodDrinks />} />
        <Route path="/Foods/Add" element={<AddFDForm />} />
        <Route path="/:slug/showtimes" element={<Showtimes />} />
        <Route path="/edit" element={<EditMovieModal />} />
      </Routes>
    </div>
    /* <div className="vertical-menu">
            <Link to="#" className="active">
                Tất cả phim
            </Link>
            <NavLink end to="/Admin/movie">
                Tạo phim mới
            </NavLink>
            <Link to="#">Phim được yêu thích</Link>
        </div> */
    // </div>
  );
}
