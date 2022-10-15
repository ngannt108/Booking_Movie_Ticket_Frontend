import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Redux/Store/Store";
import "./Header.css";

export default function Header() {
  const store = useContext(StoreContext);
  const [userName, setUserName] = useState();
  useEffect(() => {
    setUserName(store.account.userAccount.account);
  }, [store.account]);
  return (
    <div>
      <header>
        <div className="container">
          <div className="MainHeader">
            <Link to="/">NP MOVIE-STAR</Link>
          </div>
          <div className="MainHeader">
            {userName ? (
              <div className="dropdown">
                <h1>{userName}</h1>
                <div className="dropdown-content">
                  <Link to="/Account">TÀI KHOẢN</Link>
                  <Link
                    onClick={() =>
                      store.account.AccountDispatch({
                        type: "ACCOUNT",
                        payload: null,
                      })
                    }
                    to="/"
                  >
                    ĐĂNG XUẤT
                  </Link>
                </div>
              </div>
            ) : (
              <ul>
                <li>
                  <Link to="/SignUp">ĐĂNG KÝ</Link>
                </li>
                <li>
                  <Link to="/SignIn">ĐĂNG NHẬP</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
