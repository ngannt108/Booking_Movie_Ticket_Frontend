import React from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

export default function Carousel() {
  return (
    <div>
      <div className="MainNav">
        <h1>NP MOVIE-STAR</h1>
        <ul>
          <li>
            <div className="dropdown">
              <span>PHIM</span>
              <div className="dropdown-content">
                <Link to="/ShowingMovies">PHIM ĐANG CHIẾU</Link>
                <Link to="/ComingMovies">PHIM SẮP CHIẾU</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <span>CỤM RẠP</span>
              <div className="dropdown-content">
                <Link to="/Theaters">TẤT CẢ CÁC RẠP</Link>
                <Link to="/">RẠP YÊU THÍCH</Link>
              </div>
            </div>
          </li>
          <li>
            <Link to="/">LỊCH CHIẾU</Link>
          </li>
          <li>
            <div className="dropdown">
              <span>THÀNH VIÊN</span>
              <div className="dropdown-content">
                <Link to="/">TÀI KHOẢN</Link>
                <Link to="/">VÉ CỦA TÔI</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="Banner">
        <div>
          <img
            src="https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWsliUxUhUxwb5jY8RoZwwd_s327F0SpA_bd8KCGBvcGAY_GumB9ClOwYrliLPigeDYfAcAxETe7QT2dmOvFwZkqzfufSVKqNvTh81RV7U99P53wP5D_yLjdpkdoFx8Jul82H8OWZxF8neZJY1cSSHqINKw.jpg?r=03a"
            width="1200px"
            height="400px"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}
