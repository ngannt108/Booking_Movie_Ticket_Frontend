import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <header>
        <div className="container">
          <div className="MainHeader">
            <h1>NP MOVIE-STAR</h1>
          </div>
          <div className="MainHeader">
            <ul>
              <li>
                <Link to="/">ĐĂNG KÝ</Link>
              </li>
              <li>
                <Link to="/">ĐĂNG NHẬP</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
