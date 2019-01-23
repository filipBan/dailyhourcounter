import React from "react";
import { StyledInput } from "../StyledComponents/LoginRegister";

const AuthInput = ({ type, value, onChange, label, ...other }) => (
  <StyledInput
    type={type}
    value={value}
    onChange={e => onChange(type, e)}
    placeholder={type === "number" ? "current hourly wages" : type}
    required
    fullWidth
    inputProps={{ "aria-label": label }}
    {...other}
  />
);

export default AuthInput;
