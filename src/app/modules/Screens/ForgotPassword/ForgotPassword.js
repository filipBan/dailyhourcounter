import React, { Component } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";

import {
  Container,
  Logo,
  FormSection,
  FormContainer,
  Form,
  Progress
} from "../../../components/StyledComponents/LoginRegister";

import Button from "../../../components/Button";

import AuthInput from "../../../components/AuthInput";

class ForgotPassword extends Component {
  static propTypes = {
    sendResetPasswordEmail: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  state = {
    email: ""
  };

  submitForm = e => {
    e.preventDefault();
    this.props.sendResetPasswordEmail(this.state.email);
  };

  updateEmail = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <Container id="forgot-container">
        <Logo fontSize="4rem">
          <span>Daily</span>
          <span>Hours</span>
        </Logo>
        <FormSection>
          <FormContainer>
            <Progress>{this.props.loading && <LinearProgress />}</Progress>
            <Form onSubmit={this.submitForm}>
              <AuthInput
                value={this.state.email}
                onChange={(type, e) => this.updateEmail(e)}
                placeholder="Enter your email address"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginTop: "4rem" }}
                aria-label="register-submit-button"
              >
                Send
              </Button>
            </Form>
            <Link to="/">Back to Login page</Link>
          </FormContainer>
        </FormSection>
      </Container>
    );
  }
}

export default ForgotPassword;
