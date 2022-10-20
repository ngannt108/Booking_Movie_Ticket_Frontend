import React, { useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import VideoPopUp from "../VideoPopUp2/VideoPopUp2";
import "./Carousel.css";

export default function Carousel() {
  const store = useContext(StoreContext);
  return (
    // Carousel
    <div id="demo" className="carousel slide" data-ride="carousel">
      {/* Indicators */}
      <ul className="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" className="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
        <li data-target="#demo" data-slide-to="3"></li>
      </ul>
      {/* The slideshow */}
      <div className="carousel-inner">
        {store.lsComingMovie.ComingMovie.listMovie && (
          <div
            style={{
              // backgroundImage: `url(${store.lsComingMovie.ComingMovie.listMovie.BannerUrl})`,
              background: "black",
            }}
            className={`carousel-item item2 text-white active`}
          >
            <div className="container-xl px-5">
              <div className="row">
                <div className="col-md-9">
                  <h3 className="carousel__h3">
                    {store.lsComingMovie.ComingMovie.listMovie.ApiGenreName}
                  </h3>
                  <h1 className="carousel__h1">
                    {store.lsComingMovie.ComingMovie.listMovie.tenPhim}
                  </h1>
                  <p className="carousel__p mb-4 movie-decription">
                    {store.lsComingMovie.ComingMovie.listMovie.moTa}
                  </p>
                  <div className="carousel-trailer">
                    {/* <span className="carousel__span">
                      {store.lsComingMovie.ComingMovie.listMovie.ApiRating}
                    </span> */}
                    <VideoPopUp
                      link={store.lsComingMovie.ComingMovie.listMovie.trailer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {store.lsComingMovie.ComingMovie.listMovie &&
          store.lsComingMovie.ComingMovie.listMovie
            .slice(1, 4)
            .map((movie, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${movie.BannerUrl})` }}
                className={`carousel-item item${index + 1} text-white`}
              >
                <div className="container-xl px-5">
                  <div className="row">
                    <div className="col-md-9">
                      {/* <h3 className="carousel__h3">{movie.ApiGenreName}</h3> */}
                      <h1 className="carousel__h1">{movie.tenPhim}</h1>
                      <p className="carousel__p mb-4 movie-decription">
                        {movie.moTa}
                      </p>
                      <div className="carousel-trailer">
                        {/* <span className="carousel__span">
                          {movie.ApiRating}
                        </span> */}
                        <VideoPopUp link={movie.trailer} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="carousel__icon">
        <img className="carousel__arrow" src="./img/scroll-arrow.svg" alt="" />
      </div>
    </div>
  );
}
