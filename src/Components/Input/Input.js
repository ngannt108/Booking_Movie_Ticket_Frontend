import React from "react";

export const Input = ({
  value,
  label,
  name,
  height = "25px",
  width = "100%",
  border = "1px solid lightgray",
  type,
  onChange,
  boxShadow = "none",
  disabled = "true"
}) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      style={{ height, width, border, boxShadow }}
      className="form-control"
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);
