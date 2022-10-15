import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { API_ACCOUNTS } from "../../common/ApiController";

export default function LogIn() {
  const [account, setAccount] = useState({
    taiKhoan: "",
    messError: "",
  });
  const [password, setPassword] = useState({
    matKhau: "",
    messError: "",
  });
  const [passwordRetype, setPassRetype] = useState({
    nhapLaiMatKhau: "",
    messError: "",
  });
  const [email, setEmail] = useState({
    email: "",
    messError: "",
  });
  const [name, setName] = useState({
    hoTen: "",
    messError: "",
  });
  const [phoneNumber, setPhoneNumber] = useState({
    SDT: "",
    messError: "",
  });
  const info = {
    taiKhoan: account.taiKhoan,
    matKhau: password.matKhau,
    email: email.email,
    hoTen: name.hoTen,
    SDT: phoneNumber.SDT,
  };

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
    {
      nameInput: "email",
      inputValue: "email",
      error: "messError",
      pattern: /^\w+@\w+(\.\w+)+$/,
      messError: "Vui lòng nhập đúng cú pháp email!",
      messError1: "Vui lòng nhập email!",
    },
    {
      nameInput: "phoneNumber",
      inputValue: "SDT",
      error: "messError",
      pattern: /^\d{10}$/,
      messError: "Vui lòng nhập đúng dãy số điện thoại!",
      messError1: "Vui lòng nhập số điện thoại!",
    },
    {
      nameInput: "name",
      inputValue: "hoTen",
      error: "messError",
      pattern: /^.+$/,
      messError: "Vui lòng nhập tên đầy đủ",
    },
  ];

  const navigate = useNavigate();

  const UserRegister = async (event, account) => {
    event.preventDefault();
    if (Validation(account)) {
      if (password.matKhau === passwordRetype.nhapLaiMatKhau) {
        let res = await fetch(API_ACCOUNTS.SIGNUP, {
          headers: {
            //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(account),
        });
        if (res.status === 201) {
          navigate("/SignIn");
        } else {
          alert("Đăng ký thất bại!");
        }
      }
    }
  };
  const Validation = (account) => {
    Object.values(account).forEach((info) => {
      if (info.trim() === "") {
        alert("Vui lòng nhập đầy đủ");
        return false;
      }
      return true;
    });
  };
  return (
    <div className="main">
      <div className="sign-up">
        <h1>ĐĂNG KÝ</h1>
        <form>
          <div className="sign-up-row">
            <div className="sign-up-col-5">
              <Input
                type="text"
                label="Tài Khoản:"
                name="account"
                onChange={(event) =>
                  setAccount((previousAccount) => {
                    return { ...previousAccount, taiKhoan: event.target.value };
                  })
                }
                border="0px"
                color="#d6ebff"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
              <Input
                type="password"
                label="Mật khẩu:"
                name="password"
                onChange={(event) =>
                  setPassword((previousAccount) => {
                    return { ...previousAccount, matKhau: event.target.value };
                  })
                }
                border="0px"
                color="#d6ebff"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
              <Input
                type="password"
                label="Nhập lại mật khẩu:"
                color="#d6ebff"
                name="passwordRetype"
                onChange={(event) =>
                  setPassRetype((previousAccount) => {
                    return {
                      ...previousAccount,
                      nhapLaiMatKhau: event.target.value,
                    };
                  })
                }
                border="0px"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
            </div>
            <div className="sign-up-col-5">
              <Input
                type="text"
                label="Email:"
                name="email"
                color="#d6ebff"
                onChange={(event) =>
                  setEmail((previousAccount) => {
                    return { ...previousAccount, email: event.target.value };
                  })
                }
                border="0px"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
              <Input
                type="text"
                label="Số điện thoại:"
                name="phoneNumber"
                color="#d6ebff"
                onChange={(event) =>
                  setPhoneNumber((previousAccount) => {
                    return { ...previousAccount, SDT: event.target.value };
                  })
                }
                border="0px"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
              <Input
                type="text"
                label="Họ tên:"
                name="fullname"
                color="#d6ebff"
                onChange={(event) =>
                  setName((previousAccount) => {
                    return { ...previousAccount, hoTen: event.target.value };
                  })
                }
                border="0px"
                height="25px"
                width="100%"
                boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
              />
            </div>
          </div>
          <Button
            border="0px"
            background="#d6ebff"
            name="Đăng ký"
            color="black"
            fontWeight="bolder"
            width="100%"
            onClick={(event) => UserRegister(event, info)}
          />
          <span style={{ color: "#d6ebff" }}>Đã có tài khoản? </span>
          <Link
            to="/SignIn"
            style={{ textDecoration: "underline", fontWeight: "bolder" }}
          >
            Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
}
