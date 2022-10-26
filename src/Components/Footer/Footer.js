import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // Footer
    <footer className="text-center">
      <div className="about dark">
        <div className="about__top container-xl pt-5 pb-3">
          <div className="row">
            <div className="col-md-3 col-12">
              <h2>Get in touch</h2>
              <ul>
                <li>
                  <Link to="#">FAQs</Link>
                </li>
                <li>
                  <Link to="#">Give us feedback</Link>
                </li>
                <li>
                  <Link to="#">Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-12">
              <h2>About Movie star</h2>
              <ul>
                <li>
                  <Link to="#">About us</Link>
                </li>
                <li>
                  <Link to="#">Find us</Link>
                </li>
                <li>
                  <Link to="#">Schedule</Link>
                </li>
                <li>
                  <Link to="#">News</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-12">
              <h2>Legal stuff</h2>
              <ul>
                <li>
                  <Link to="#">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="#">Privacy policy</Link>
                </li>
                <li>
                  <Link to="#">Cookie policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-12">
              <h2>Connect with us</h2>
              <ul>
                <li>
                  <Link to="#">
                    <i className="fab fa-facebook-f"></i>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-twitter"></i>
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-google-plus-g"></i>
                    Google +
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="about__bottom container-xl text-left">
          <p>
            2017 © Movie Star /
            <Link to="https://www.klevermedia.co.uk/">
              Web design by Klever media
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
