import React, { useEffect, useContext } from "react";
import "./ComingMovies.css";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";

export default function ComingMovies() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_MOVIE.COMING)
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ComingMovieDispatch({
          type: "GETCOMINGMOVIES",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="lsMovie">
      {console.log(store)}
      {store.lsComingMovie.ComingMovie.lsComingMovie?.map((n, i) => (
        <div key={i} className="movie">
          <img src={n.hinhAnh} alt="movie.img" />
          <h3>{n.tenPhim}</h3>
          <p>{n.thoiLuong} phút</p>
          <p>{n.danhGia}</p>
          <button>Đặt vé</button>
        </div>
      ))}
    </div>
  );
}
