import React, { useContext, useEffect, useState } from "react";
import "./MovieDetail.css";
import { StoreContext } from "../../Redux/Store/Store";
import { useParams } from "react-router-dom";
import { API_MOVIE } from "../../common/ApiController";

export default function MovieDetail() {
  const store = useContext(StoreContext);
  const { biDanh } = useParams();

  //Biến ngày giờ hiện tại
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [currentDate, setCurentDate] = useState(null);

  useEffect(() => {
    if (biDanh) {
      fetch(`${API_MOVIE.DETAIL + biDanh}`)
        .then((res) => res.json())
        .then((dt) => {
          store.movie.DetailMovieDispatch({
            type: "GETDETAILMOVIE",
            payload: dt.data[0],
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biDanh]);

  return (
    <>
      {store.movie.DetailMovie.detailMovie && (
        <div className="movie-detail-container">
          <div className="movie-banner">
            <img
              alt=""
              width={"100%"}
              src={store.movie.DetailMovie.detailMovie.anhBia}
            />
          </div>
          <div className="movie-detail-main-content">
            <div className="movie-detail-all-info">
              <div className="left-banner">
                <img
                  width={"250"}
                  alt=""
                  src={store.movie.DetailMovie.detailMovie.hinhAnh}
                />
              </div>
              <div>
                <div className="base-info">
                  <div className="movie-name">
                    <h1>{store.movie.DetailMovie.detailMovie.tenPhim}</h1>
                  </div>
                  <p className="movie-duaration">
                    {store.movie.DetailMovie.detailMovie.thoiLuong} minutes
                  </p>
                  {/* <div className="movie-row">
                    <p className="movie-label">English title:</p>
                    <p className="label-info">
                      {store.MovieDetail.detail.TitleEn}
                    </p>
                  </div> */}
                  <div className="movie-row">
                    <p className="movie-label">Country:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.quocGia}
                    </p>
                  </div>
                  <div className="movie-row">
                    <p className="movie-label">Genre:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.theLoai.join(", ")}
                    </p>
                  </div>
                  <div className="movie-row">
                    <p className="movie-label">Release:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.ngayKhoiChieu.slice(
                        0,
                        10
                      )}
                    </p>
                  </div>
                </div>
                <div className="movie-synopsis">
                  <h1 className="synopsis-header">Description</h1>
                  <div className="synopsis-content">
                    {store.movie.DetailMovie.detailMovie.moTa}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="movie-showtime">
            <h1 className="movie-showtime-header">Showtime</h1>
            <section className="container container-mdc">
              <div className="row showtime-fields">
                <MovieDetailCinemas
                  setDate={setCurentDate}
                  date={currentDate}
                  banner={store.MovieDetail.detail.GraphicUrl}
                  title={store.MovieDetail.detail.Title}
                />
              </div>
            </section>
          </div> */}
        </div>
      )}
    </>
  );
}
