import React from "react";
import PropTypes from "prop-types";
import { StyledInput } from "../StyledComponents/LoginRegister";

const AuthInput = ({ type, value, onChange, label, ...other }) => (
  <StyledInput
    type={type}
    value={value}
    onChange={e => onChange(type, e)}
    placeholder={type === "number" ? "current hourly wages" : type}
    fullWidth
    required
    inputProps={{ "aria-label": label }}
    {...other}
  />
);

AuthInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default AuthInput;
