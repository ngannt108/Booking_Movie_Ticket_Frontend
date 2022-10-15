import React from "react";

export const Button = ({
  border = "1px solid lightgray",
  background = "brown",
  color = "white",
  fontWeight = "normal",
  name = "Hello",
  borderRadius = "none",
  width = "40px",
  onClick,
}) => (
  <div style={{ padding: "20px 0px" }}>
    <button
      style={{
        border,
        borderRadius,
        color,
        background,
        fontWeight,
        width,
        padding: "10px 0px",
        fontSize: "20px",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  </div>
);
