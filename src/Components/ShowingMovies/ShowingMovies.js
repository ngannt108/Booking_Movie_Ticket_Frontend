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
        store.lsShowingMovie.ShowingMovieDispatch({
          type: "GETSHOWINGMOVIES",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      {store.lsShowingMovie.ShowingMovie.lsShowingMovie?.map((n, i) => (
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
