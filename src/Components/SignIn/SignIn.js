import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { API_ACCOUNTS } from "../../common/ApiController";

export default function LogIn() {
  const [info, setAccount] = useState({ taiKhoan: "", matKhau: "" });

  const UserSignIn = async (event, info) => {
    event.preventDefault();
    let res = await fetch(API_ACCOUNTS.SIGNIN, {
      headers: {
        //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(info),
    });
    if (res.status === 200) {
      console.log(1);
    } else {
      console.log(0);
    }
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
              setAccount((previousAccount) => {
                return { ...previousAccount, matKhau: event.target.value };
              })
            }
            border="0px"
            height="25px"
            boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
          />
          <Link to="/"> Forgot password!</Link>
          <Button
            border="0px"
            background="#d6ebff"
            color="black"
            name="Đăng nhập"
            fontWeight="bolder"
            width="100%"
            onClick={(event) => UserSignIn(event, info)}
          />
        </form>
      </div>
    </div>
  );
}
