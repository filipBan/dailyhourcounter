import React from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";

import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "../../../components/Button";
import AuthInput from "../../../components/AuthInput";

import {
  Container,
  Logo,
  FormSection,
  BottomLinks,
  FormContainer,
  Form,
  Progress
} from "../../../components/StyledComponents/LoginRegister";

const RegisterPage = ({
  userName,
  updateInput,
  isLoggedIn,
  wages,
  email,
  password,
  confirmPassword,
  loading,
  registerNewAccount,
  authError
}) => {
  const submitForm = e => {
    e.preventDefault();
    if (
      userName &&
      wages &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      return registerNewAccount({ email, password, userName, wages });
    } else if (password !== confirmPassword) {
      return authError("Passwords don't match");
    }
  };

  const handleInputChange = (field, event) => {
    updateInput(field, event.target.value);
  };

  if (isLoggedIn) {
    return <Redirect to="/today" />;
  }

  return (
    <Container>
      <Logo fontSize="4rem">
        <span>Daily</span>
        <span>Hours</span>
      </Logo>
      <FormSection>
        <FormContainer>
          <Progress>{loading && <LinearProgress />}</Progress>
          <Form onSubmit={event => submitForm(event)}>
            <AuthInput
              type="userName"
              value={userName}
              onChange={(type, e) => handleInputChange(type, e)}
              paddingtop="2rem"
              aria-label="user-name-field"
            />
            <AuthInput
              type="number"
              value={wages}
              onChange={(type, e) => handleInputChange("wages", e)}
              paddingtop="2rem"
              aria-label="wages-field"
            />
            <AuthInput
              type="email"
              value={email}
              onChange={(type, e) => handleInputChange(type, e)}
              paddingtop="2rem"
              aria-label="email-field"
            />
            <AuthInput
              type="password"
              value={password}
              onChange={(type, e) => handleInputChange(type, e)}
              paddingtop="2rem"
              aria-label="password-field"
            />
            <AuthInput
              type="password"
              value={confirmPassword}
              onChange={(type, e) => handleInputChange("confirmPassword", e)}
              paddingtop="2rem"
              aria-label="confirm-password-field"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: "2rem" }}
              disabled={loading}
              aria-label="register-submit-button"
            >
              Register
            </Button>
          </Form>
          <BottomLinks marginBottom="2rem">
            <span>By registering you automatically accept the following:</span>
            <Link to="/register">
              <span>Terms and Conditions</span>
            </Link>
            <Link to="/register">
              <span>Privacy policy</span>
            </Link>
          </BottomLinks>
          <BottomLinks marginBottom="2rem">
            Already have an account?
            <Link to="/">Login</Link>
          </BottomLinks>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

RegisterPage.propTypes = {
  userName: PropTypes.string,
  updateInput: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  wages: PropTypes.number,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  registerNewAccount: PropTypes.func.isRequired,
  authError: PropTypes.func.isRequired
};

RegisterPage.defaultProps = {
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  wages: null
};

export default RegisterPage;
