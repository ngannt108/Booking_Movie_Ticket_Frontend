import React from "react";
import './Button.css'
export const Button = ({
  border = "1px solid lightgray",
  background = "brown",
  color = "white",
  fontWeight = "normal",
  name = "Hello",
  borderRadius = "none",
  width = "100%",
  margin = "0px",
  onClick,
  disabled,
  textAlign,
  ...rest
}) => (
  <button className="on-hover" style={{ border, borderRadius, color, background, fontWeight, width, margin, textAlign, ...rest }} onClick={onClick} disabled={disabled} >
    {name}
  </button >
);
