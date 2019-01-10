import React from "react";
import { StyledInput } from "../StyledComponents/LoginRegister";

const AuthInput = ({ type, value, onChange }) => (
  <StyledInput
    type={type}
    value={value}
    onChange={e => onChange(type, e)}
    placeholder={type}
    fullWidth
    required
  />
);

export default AuthInput;
