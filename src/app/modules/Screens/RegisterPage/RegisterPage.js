import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "../../../components/Button";
import Snackbar from "../../../components/Snackbar";

import {
  Container,
  Logo,
  FormSection,
  BottomLinks,
  FormContainer,
  Form,
  StyledInput,
  Progress
} from "../../../components/StyledComponents/LoginRegister";

class RegisterPage extends Component {
  state = {
    userName: "",
    wages: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  submitForm(e) {
    e.preventDefault();
    const { userName, wages, email, password, confirmPassword } = this.state;
    if (
      userName &&
      wages &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      this.props.registerNewAccount(this.state);
    }
  }

  handleInputChange(field, event) {
    const { value } = event.target;
    this.setState({ [field]: value });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const { userName, wages, email, password, confirmPassword } = this.state;

    const { loading, error, clearAuthErrors } = this.props;

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
              <StyledInput
                type="string"
                value={userName}
                onChange={e => this.handleInputChange("userName", e)}
                placeholder="user name"
                fullWidth
                required
                paddingTop="2rem"
              />
              <StyledInput
                type="number"
                value={wages}
                onChange={e => this.handleInputChange("wages", e)}
                placeholder="current hourly salary"
                fullWidth
                required
                paddingTop="2rem"
              />
              <StyledInput
                type="email"
                value={email}
                onChange={e => this.handleInputChange("email", e)}
                placeholder="email"
                fullWidth
                required
                paddingTop="2rem"
              />
              <StyledInput
                type="password"
                value={password}
                onChange={e => this.handleInputChange("password", e)}
                placeholder="password"
                fullWidth
                required
                paddingTop="2rem"
              />
              <StyledInput
                type="password"
                value={confirmPassword}
                onChange={e => this.handleInputChange("confirmPassword", e)}
                placeholder="confirm password"
                fullWidth
                required
                paddingTop="2rem"
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
