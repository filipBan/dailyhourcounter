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
  Progress,
  StyledInput
} from "../../../components/StyledComponents/LoginRegister";

class LoginPage extends Component {
  componentWillUnmount() {
    this.props.clearAuthErrors();
  }

  submitForm(e) {
    e.preventDefault();
    const { email, password } = this.props.auth;
    this.props.logInWithEmailAndPassword(email, password);
  }

  handleInputChange(field, event) {
    const { value } = event.target;
    this.props.updateInput(field, value);
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const { email, password, error, loading } = this.props.auth;
    const { clearAuthErrors } = this.props;

    return (
      <Container>
        <Logo>
          <span>Daily</span>
          <span>Hours</span>
        </Logo>
        <FormSection>
          <FormContainer height="30rem">
            <Progress>{loading && <LinearProgress />}</Progress>
            <Form onSubmit={event => this.submitForm(event)}>
              <StyledInput
                type="email"
                value={email}
                onChange={e => this.handleInputChange("email", e)}
                placeholder="email"
                fullWidth
              />
              <StyledInput
                type="password"
                value={password}
                onChange={e => this.handleInputChange("password", e)}
                placeholder="password"
                fullWidth
              />
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
        <Snackbar error={error} onClose={clearAuthErrors} />
      </Container>
    );
  }
}

export default LoginPage;
