import React from "react";
import { Input } from "./index";
const InputGroup = ({
  currency = "$",
  placeholder,
  name,
  onChange,
  value,
  onKeyDown,
}) => {
  return (
    <div className="input-group">
      <span className="input-group-text">{currency}</span>
      <Input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputGroup;
