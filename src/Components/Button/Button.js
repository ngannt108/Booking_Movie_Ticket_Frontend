import React from "react";

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
}) => (
  <button style={{ border, borderRadius, color, background, fontWeight, width, margin }} onClick={onClick}>
    {name}

  </button>
);
