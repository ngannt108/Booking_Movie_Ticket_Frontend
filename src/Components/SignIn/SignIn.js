import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { StoreContext } from "../../Redux/Store/Store";
import { API_ACCOUNTS } from "../../common/ApiController";

export default function LogIn() {
  const store = useContext(StoreContext);
  const [account, setAccount] = useState({
    taiKhoan: "",
    messError: "",
  });
  const [password, setPassword] = useState({
    matKhau: "",
    messError: "",
  });
  const REGEX_LIST = [
    {
      nameInput: "account",
      inputValue: "taiKhoan",
      error: "messError",
      pattern: /^.+$/,
      messError: "Vui lòng nhập tên tài khoản!",
    },
    {
      nameInput: "password",
      inputValue: "matKhau",
      error: "messError",
      pattern: /^.+$/,
      messError: "Vui lòng nhập mật khẩu!",
    },
  ];
  const info = { taiKhoan: account.taiKhoan, matKhau: password.matKhau };
  const navigate = useNavigate();

  const UserSignIn = async (event, info) => {
    event.preventDefault();
    if (Validation(info)) {
      let res = await fetch(API_ACCOUNTS.SIGNIN, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(info),
      });
      if (res.status === 200) {
        let dataUser = await res.json();

        const {
          token,
          data,
          expiresIn /*taiKhoan, maLoaiNguoiDung, ...authSignIn*/,
        } = dataUser;
        console.log(data);
        store.account.AccountDispatch({
          type: "ACCOUNT",
          payload: data.tentaiKhoan,
        });
        // set localStorage
        //const maLichChieu = JSON.parse(localStorage.getItem("maLichChieu"));
        sessionStorage.setItem("token", JSON.stringify(token));
        //localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
        sessionStorage.setItem(
          "maLoaiNguoiDung",
          JSON.stringify(data.maLoaiNguoiDung)
        );
        sessionStorage.setItem("taiKhoan", JSON.stringify(data.tentaiKhoan));
        sessionStorage.setItem("thoiHan", JSON.stringify(expiresIn));
        if (JSON.parse(sessionStorage.getItem("maLoaiNguoiDung")) === "0") {
          navigate("/Admin");
        } else {
          navigate("/");
        }
      } else {
        alert("Đăng nhập thất bại!");
      }
    }
  };
  const Validation = (account) => {
    Object.values(account).forEach((info) => {
      if (info === "") {
        alert("Vui lòng nhập đầy đủ");
        return false;
      }
    });
    return true;
  };
  return (
    <div className="main">
      <div className="sign-in">
        <h1>ĐĂNG NHẬP</h1>
        <form>
          <div className="row-input">
            <label className="lable-input">Tài khoản</label>
            <input
              className="input-field"
              onChange={(event) =>
                setAccount((previousAccount) => {
                  return { ...previousAccount, taiKhoan: event.target.value };
                })
              }
            />
          </div>
          <div className="row-input">
            <label className="lable-input">Mật khẩu</label>
            <input
              className="input-field"
              type="password"
              onChange={(event) =>
                setPassword((previousAccount) => {
                  return { ...previousAccount, matKhau: event.target.value };
                })
              }
            />
          </div>
          <button
            className="button-signin"
            onClick={(event) => UserSignIn(event, info)}
          >
            Đăng Nhập
          </button>
          <Link to="/ForgotPassword"> Forgot password!</Link>
          <div>
            <span style={{ color: "#d6ebff" }}>Chưa có tài khoản? </span>
            <Link
              to="/SignUp"
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
