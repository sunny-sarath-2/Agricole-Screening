import React from "react";

const Input = ({
  placeholder = "placeholder",
  type = "text",
  name,
  onChange,
  value,
  style,
  onKeyDown,
}) => {
  return (
    <input
      type={type}
      name={name}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      value={value}
      className="form-control"
      placeholder={placeholder}
      style={style}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
