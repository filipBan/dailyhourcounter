import React from "react";
import { StyledInput } from "../StyledComponents/LoginRegister";

const AuthInput = ({ type, value, onChange, ...other }) => (
  <StyledInput
    type={type}
    value={value}
    onChange={e => onChange(type, e)}
    placeholder={type === "number" ? "current hourly wages" : type}
    fullWidth
    required
    {...other}
  />
);

export default AuthInput;
