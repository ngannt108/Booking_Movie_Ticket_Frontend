import React, { useEffect, useContext, useState } from "react";
import "./ShowingMovies.css";
import { StoreContext } from "../../Redux/Store/Store";

export default function ComingMovies() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch("http://localhost:5000/movie/showing")
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ShowingMovieDispatch({
          type: "GETSHOWINGMOVIE",
          payload: dt.data,
        });
      });
  }, []);
  return (
    <div className="container">
      {store.lsComingMovie.ComingMovie.lsComingMovie &&
        store.lsComingMovie.ComingMovie.lsComingMovie.map((n, i) => (
          <div key={i} className="lsMovie">
            <img src={n.hinhAnh} alt="Image" />
            <p>{n.tenPhim}</p>
            <p>{n.thoiLuong} phút</p>
            <p>{n.danhGia}</p>
            <button>Đặt vé</button>
          </div>
        ))}
    </div>
  );
}
