import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Redux/Store/Store";
import "./Header.css";

export default function Header() {
  const store = useContext(StoreContext);
  const [userAvt, setUserAvt] = useState();

  useEffect(() => {
    if (store.account.Profile.profile) {
      // console.log(store.account.Profile.profile);
      setUserAvt(store.account.Profile.profile.anhDaiDien);
    }
  }, [store.account.Profile.profile]);
  return (
    <div>
      <header style={{ paddingTop: "12px" }} id="header__run">
        <div className="container-xl">
          {/* navbar */}
          <nav className="navbar navbar-expand-md navbar-dark">
            {/* Brand */}
            <Link className="navbar-brand" to="/">
              <img onClick={() => {}} src="./img/logo.svg" alt="" />
            </Link>

            {/* Toggler/collapsibe Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar links */}
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto text-nowrap">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Phim
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Theaters">
                    Hệ thống rạp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Khuyến mãi
                  </Link>
                </li>

                {userAvt ? (
                  <li className="nav-item LoggedIn">
                    <div style={{ marginTop: "20px" }} className="dropdown ">
                      <Link className="userName" to="/">
                        <img
                          src={userAvt}
                          width="36"
                          height="36"
                          style={{ borderRadius: "50%" }}
                          alt=""
                        />
                      </Link>
                      <div className="dropdown-content">
                        <Link onClick={() => {}} to="/Profile">
                          Trang cá nhân
                        </Link>
                        <Link
                          onClick={() => {
                            store.account.AccountDispatch({
                              type: "ACCOUNT",
                              payload: null,
                            });
                            localStorage.clear();
                            store.account.ProfileDispatch({
                              type: "PROFILE",
                              payload: null,
                            });
                            setUserAvt(null);
                          }}
                          to="/"
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="nav-link un-login">
                    <Link to="/SignIn">Đăng nhập</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
