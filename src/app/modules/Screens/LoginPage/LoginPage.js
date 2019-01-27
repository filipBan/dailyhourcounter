import React from "react";
import PropTypes from "prop-types";

import { Redirect, Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "../../../components/Button";

import {
  Container,
  Logo,
  FormSection,
  BottomLinks,
  FormContainer,
  Form,
  Progress
} from "../../../components/StyledComponents/LoginRegister";

import AuthInput from "../../../components/AuthInput";

const LoginPage = ({
  email,
  password,
  logInWithEmailAndPassword,
  loading,
  updateInput,
  isLoggedIn
}) => {
  const submitForm = e => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  const handleInputChange = (field, event) => {
    const { value } = event.target;
    updateInput(field, value);
  };

  if (isLoggedIn) {
    return <Redirect to="/today" />;
  }

  return (
    <Container>
      <Logo>
        <span>Daily</span>
        <span>Hours</span>
      </Logo>
      <FormSection>
        <FormContainer height="30rem">
          <Progress>{loading && <LinearProgress />}</Progress>
          <Form onSubmit={event => submitForm(event)}>
            <AuthInput
              type="email"
              value={email}
              onChange={(type, e) => handleInputChange(type, e)}
              label="email"
            />
            <AuthInput
              type="password"
              value={password}
              onChange={(type, e) => handleInputChange(type, e)}
              label="password"
            />
            <BottomLinks>
              <Link to="/forgot-password">
                <span>Forgot my password</span>
              </Link>
            </BottomLinks>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              Login
            </Button>
          </Form>

          <BottomLinks>
            <span>Don't have an account?</span>
            <Link to="/register">
              <span>Register here.</span>
            </Link>
          </BottomLinks>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  logInWithEmailAndPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateInput: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default LoginPage;
