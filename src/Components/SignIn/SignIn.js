import React, { useState, useContext } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
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
      console.log(res.status);
      if (res.status === 200) {
        let dataUser = await res.json();
        store.account.AccountDispatch({
          type: "ACCOUNT",
          payload: info.taiKhoan,
        });
        const {
          token,
          data,
          expiresIn /*taiKhoan, maLoaiNguoiDung, ...authSignIn*/,
        } = dataUser;
        // set localStorage
        //const maLichChieu = JSON.parse(localStorage.getItem("maLichChieu"));
        localStorage.setItem("token", JSON.stringify(token));
        //localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
        console.log(info);
        localStorage.setItem(
          "maLoaiNguoiDung",
          JSON.stringify(data.maLoaiNguoiDung)
        );
        localStorage.setItem("taiKhoan", JSON.stringify(data.tentaiKhoan));
        localStorage.setItem("thoiHan", JSON.stringify(expiresIn));
        if (JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "0") {
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
          <Input
            type="text"
            label="Tài Khoản"
            name="account"
            color="#d6ebff"
            onChange={(event) =>
              setAccount((previousAccount) => {
                return { ...previousAccount, taiKhoan: event.target.value };
              })
            }
            border="0px"
            height="25px"
            boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
          />
          <Input
            type="password"
            label="Mật khẩu"
            color="#d6ebff"
            name="password"
            onChange={(event) =>
              setPassword((previousAccount) => {
                return { ...previousAccount, matKhau: event.target.value };
              })
            }
            border="0px"
            height="25px"
            boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
          />
          <Button
            border="0px"
            background="#d6ebff"
            color="black"
            name="Đăng nhập"
            fontWeight="bolder"
            width="100%"
            onClick={(event) => UserSignIn(event, info)}
          />
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
