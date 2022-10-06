import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./SignUp.css";
import { API_ACCOUNTS } from "../../common/ApiController";

export default function LogIn() {
  const [info, setAccount] = useState({
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    email: "",
    hoTen: "",
    SDT: "",
  });
  const account = {
    taiKhoan: info.taiKhoan,
    matKhau: info.matKhau,
    email: info.email,
    hoTen: info.hoTen,
    SDT: info.SDT,
  };

  const UserRegister = async (event, account) => {
    event.preventDefault();
    if (info.matKhau === info.nhapLaiMatKhau) {
      let res = await fetch(API_ACCOUNTS.SIGNUP, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(account),
      });
      console.log(account);
      if (res.status === 200) {
        console.log(res.status);
      } else {
        console.log(0);
      }
    }
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
                  setAccount((previousAccount) => {
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
                  setAccount((previousAccount) => {
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
                  setAccount((previousAccount) => {
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
                  setAccount((previousAccount) => {
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
                  setAccount((previousAccount) => {
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
            onClick={(event) => UserRegister(event, account)}
          />
        </form>
      </div>
    </div>
  );
}
