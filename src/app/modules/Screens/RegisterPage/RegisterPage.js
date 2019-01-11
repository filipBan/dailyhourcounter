import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "../../../components/Button";
import Snackbar from "../../../components/Snackbar";
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

class RegisterPage extends Component {
  submitForm(e) {
    e.preventDefault();
    const { userName, wages, email, password, confirmPassword } = this.props;
    if (
      userName &&
      wages &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      return this.props.registerNewAccount(this.props);
    } else if (password !== confirmPassword) {
      return this.props.authError("Passwords don't match");
    }
  }

  handleInputChange(field, event) {
    const { value } = event.target;
    this.props.updateInput(field, value);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const {
      userName,
      wages,
      email,
      password,
      confirmPassword,
      loading,
      error,
      clearAuthErrors
    } = this.props;

    return (
      <Container>
        <Logo fontSize="4rem">
          <span>Daily</span>
          <span>Hours</span>
        </Logo>
        <FormSection>
          <FormContainer>
            <Progress>{loading && <LinearProgress />}</Progress>
            <Form onSubmit={event => this.submitForm(event)}>
              <AuthInput
                type="userName"
                value={userName}
                onChange={(type, e) => this.handleInputChange(type, e)}
                paddingtop="2rem"
              />
              <AuthInput
                type="number"
                value={wages}
                onChange={(type, e) => this.handleInputChange("wages", e)}
                paddingtop="2rem"
              />
              <AuthInput
                type="email"
                value={email}
                onChange={(type, e) => this.handleInputChange(type, e)}
                paddingtop="2rem"
              />
              <AuthInput
                type="password"
                value={password}
                onChange={(type, e) => this.handleInputChange(type, e)}
                paddingtop="2rem"
              />
              <AuthInput
                type="password"
                value={confirmPassword}
                onChange={(type, e) =>
                  this.handleInputChange("confirmPassword", e)
                }
                paddingtop="2rem"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginTop: "2rem" }}
                disabled={loading}
              >
                Register
              </Button>
            </Form>
            <BottomLinks marginBottom="2rem">
              <span>
                By registering you automatically accept the following:
              </span>
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
        <Snackbar error={error} onClose={clearAuthErrors} />
      </Container>
    );
  }
}

export default RegisterPage;
