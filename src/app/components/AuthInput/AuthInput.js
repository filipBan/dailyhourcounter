import React from "react";
import PropTypes from "prop-types";
import { StyledInput } from "../StyledComponents/LoginRegister";

const AuthInput = ({ type, value, onChange, label, ...other }) => (
  <StyledInput
    type={type}
    value={value}
    onChange={e => onChange(type, e)}
    fullWidth
    required
    inputProps={{ "aria-label": label }}
    {...other}
  />
);

AuthInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

AuthInput.defaultProps = {
  label: "",
  value: null
};

export default AuthInput;
