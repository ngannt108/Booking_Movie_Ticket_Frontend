import React from "react";

export const Button = ({
  border = "1px solid lightgray",
  background = "brown",
  color = "white",
  fontWeight = "normal",
  name = "Hello",
  borderRadius = "none",
  onClick,
}) => (
  <button style={{ border, borderRadius, color, background, fontWeight }}>
    {name}
  </button>
);
