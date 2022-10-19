import React from "react";

export const Input = ({
  value,
  label,
  name,
  height = "25px",
  width = "100%",
  border = "1px solid lightgray",
  type,
  color = "black",
  onChange,
  onClick,
  boxShadow = "none",
  disabled = "true",
}) => (
  <div className="form-group" style={{ padding: "15px 0px" }}>
    {label && (
      <label style={{ color }} htmlFor="input-field">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      style={{ height, width, border, boxShadow }}
      className="form-control"
      onChange={onChange}
      onClick={onClick}
      disabled={disabled}
    />
  </div>
);
