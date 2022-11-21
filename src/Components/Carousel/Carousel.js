import React, { useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import VideoPopUp from "../VideoPopUp2/VideoPopUp2";
import "./Carousel.css";

export default function Carousel() {
  const store = useContext(StoreContext);
  return (
    // Carousel
    <div
      id="demo"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      {/* Indicators */}
      <ul className="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" className="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
        <li data-target="#demo" data-slide-to="3"></li>
      </ul>
      {/* The slideshow */}
      <div className="carousel-inner">
        {store.lsShowingMovie.ShowingMovie.listMovie && (
          <div
            style={{
              backgroundImage: `url(${store.lsShowingMovie.ShowingMovie.listMovie[0].anhBia})`,
            }}
            className={`carousel-item item2 text-white active`}
          >
            <div className="container-xl px-5">
              <div className="row">
                <div className="col-md-9">
                  <h3 className="carousel__h3">
                    {store.lsShowingMovie.ShowingMovie.listMovie[0].theLoai.join(
                      ", "
                    )}
                  </h3>
                  <h1 className="carousel__h1">
                    {store.lsShowingMovie.ShowingMovie.listMovie[0].tenPhim}
                  </h1>
                  <p className="carousel__p mb-4 movie-decription">
                    {store.lsShowingMovie.ShowingMovie.listMovie[0].moTa}
                  </p>
                  <div className="carousel-trailer">
                    <VideoPopUp
                      link={
                        store.lsShowingMovie.ShowingMovie.listMovie[0].trailer
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {store.lsShowingMovie.ShowingMovie.listMovie &&
          store.lsShowingMovie.ShowingMovie.listMovie
            .slice(1, 4)
            .map((movie, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${movie.anhBia})` }}
                className={`carousel-item item${index + 1} text-white`}
              >
                <div className="container-xl px-5">
                  <div className="row">
                    <div className="col-md-9">
                      <h3 className="carousel__h3">{movie.theLoai}</h3>
                      <h1 className="carousel__h1">{movie.tenPhim}</h1>
                      <p className="carousel__p mb-4 movie-decription">
                        {movie.moTa}
                      </p>
                      <div className="carousel-trailer">
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
