import React, { useEffect, useContext, useState } from "react";
import "./ComingMovies.css";
import { StoreContext } from "../../Redux/Store/Store";
// require("dotenv").config({ path: "../../../.env" });
// import dotenv from "dotenv";

export default function ComingMovies() {
  const store = useContext(StoreContext);
  const domain = process.env.LOCAL;
  useEffect(() => {
    fetch(`http://localhost:5000/movie/coming`)
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ComingMovieDispatch({
          type: "GETCOMINGMOVIE",
          payload: dt.data,
        });
      });
  }, []);
  return (
    <div className="container">
      {console.log(store)}
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
