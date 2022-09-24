import React, { useEffect, useContext } from "react";
import "./ShowingMovies.css";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";

export default function ComingMovies() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_MOVIE.COMING)
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
      {store.lsComingMovie.ComingMovie.lsComingMovie?.map((n, i) => (
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
