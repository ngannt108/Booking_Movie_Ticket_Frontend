import React, { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
// import { Link } from "react-router-dom";
import "./LogIn.css";

export default function LogIn() {
  const [inputValue, setInputValue] = useState({ name: "", password: "" });
  const { name, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };
  return (
    <div className="main">
      <div className="content">
        <h1>LOGIN</h1>
        <div className="formInput">
          <form>
            <Input
              type="text"
              value={name}
              label="Name"
              name="name"
              onChange={handleChange}
              border="0px"
              height="25px"
              width="100%"
              boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
            />
            <Input
              type="password"
              value={password}
              label="Password"
              name="password"
              onChange={handleChange}
              border="0px"
              height="25px"
              width="100%"
              boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.2)"
            />
            <a href="."> Forgot password!</a>
            <Button
              border="0px"
              background="brown"
              name="Log In"
              fontWeight="bolder"
            />
          </form>
          <p id="status">Login False!</p>
        </div>
      </div>
    </div>
  );
}
