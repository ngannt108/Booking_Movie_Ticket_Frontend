import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css";
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
        console.log(1);
        let res = await fetch(API_ACCOUNTS.SIGNUP, {
          headers: {
            //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(account),
        });
        console.log(res.status);
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
    });
    return true;
  };
  return (
    <div className="main">
      <div className="sign-up">
        <h1>ĐĂNG KÝ</h1>
        <form>
          <div className="sign-up-row">
            <div className="sign-up-col-5">
              <div className="row-input">
                <label className="lable-input">Tài khoản</label>
                <input
                  className="input-field"
                  onChange={(event) =>
                    setAccount((previousAccount) => {
                      return {
                        ...previousAccount,
                        taiKhoan: event.target.value,
                      };
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
                      return {
                        ...previousAccount,
                        matKhau: event.target.value,
                      };
                    })
                  }
                />
              </div>
              <div className="row-input">
                <label className="lable-input">Nhập lại mật khẩu</label>
                <input
                  className="input-field"
                  type="password"
                  onChange={(event) =>
                    setPassRetype((previousAccount) => {
                      return {
                        ...previousAccount,
                        nhapLaiMatKhau: event.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className="sign-up-col-5">
              <div className="row-input">
                <label className="lable-input">Email</label>
                <input
                  className="input-field"
                  onChange={(event) =>
                    setEmail((previousAccount) => {
                      return { ...previousAccount, email: event.target.value };
                    })
                  }
                />
              </div>
              <div className="row-input">
                <label className="lable-input">Số điện thoại</label>
                <input
                  className="input-field"
                  onChange={(event) =>
                    setPhoneNumber((previousAccount) => {
                      return { ...previousAccount, SDT: event.target.value };
                    })
                  }
                />
              </div>
              <div className="row-input">
                <label className="lable-input">Họ và tên</label>
                <input
                  className="input-field"
                  onChange={(event) =>
                    setName((previousAccount) => {
                      return { ...previousAccount, hoTen: event.target.value };
                    })
                  }
                />
              </div>
            </div>
          </div>
          <button
            className="button-signin"
            onClick={(event) => UserRegister(event, info)}
          >
            Đăng ký
          </button>
          <div>
            <span style={{ color: "#d6ebff" }}>Đã có tài khoản? </span>
            <Link
              to="/SignIn"
              style={{
                textDecoration: "underline",
                fontWeight: "bolder",
              }}
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
