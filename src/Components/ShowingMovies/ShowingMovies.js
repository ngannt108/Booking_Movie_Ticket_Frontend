import React, { useEffect, useContext } from "react";
import "./ShowingMovies.css";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";

export default function ComingMovies() {
  const store = useContext(StoreContext);
  return (
    <div className="container">
      {store.lsShowingMovie.ShowingMovie.lsMovie?.map((n, i) => (
        <div key={i} className="lsMovie">
          <img src={n.hinhAnh} alt="movie.img" />
          <p>{n.tenPhim}</p>
          <p>{n.thoiLuong} phút</p>
          <p>{n.danhGia}</p>
          <button>Đặt vé</button>
        </div>
      ))}
    </div>
  );
}
