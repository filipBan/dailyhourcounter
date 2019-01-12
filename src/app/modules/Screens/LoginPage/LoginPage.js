import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

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

const LinearProgress = React.lazy(() =>
  import("@material-ui/core/LinearProgress")
);
const Snackbar = React.lazy(() => import("../../../components/Snackbar"));

class LoginPage extends Component {
  componentWillUnmount() {
    this.props.clearAuthErrors();
  }

  submitForm(e) {
    e.preventDefault();
    const { email, password, logInWithEmailAndPassword } = this.props;
    logInWithEmailAndPassword(email, password);
  }

  handleInputChange(field, event) {
    const { value } = event.target;
    this.props.updateInput(field, value);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const { email, password, error, loading, clearAuthErrors } = this.props;

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
              <AuthInput
                type="email"
                value={email}
                onChange={(type, e) => this.handleInputChange(type, e)}
              />
              <AuthInput
                type="password"
                value={password}
                onChange={(type, e) => this.handleInputChange(type, e)}
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
        {error && <Snackbar error={error} onClose={clearAuthErrors} />}
      </Container>
    );
  }
}

export default LoginPage;
