import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";

import styled from "styled-components";

import Button from "../../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #89cff0;
  height: auto;
  min-height: 100vh;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  font-family: "Bungee", cursive;
  font-size: 4rem;
`;

const FormSection = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media only screen and (min-width: 800px) {
    & {
      flex: 4;
    }
  }
`;

const TermsLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 2rem;

  a {
    margin-top: 1rem;
  }
`;

const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30rem;
  padding: 2rem 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledInput = styled(Input)`
  input {
    font-size: 1.6rem;
    padding-top: 2.5rem;
  }
`;

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
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const { userName, wages, email, password, confirmPassword } = this.state;
    return (
      <Container>
        <Logo>
          <span>Daily</span>
          <span>Hours</span>
        </Logo>
        <FormSection>
          <FormContainer>
            <Form onSubmit={event => this.submitForm(event)}>
              <StyledInput
                type="string"
                value={userName}
                onChange={e => this.handleInputChange("userName", e)}
                placeholder="user name"
                fullWidth
                required
              />
              <StyledInput
                type="number"
                value={wages}
                onChange={e => this.handleInputChange("wages", e)}
                placeholder="current hourly salary"
                fullWidth
                required
              />
              <StyledInput
                type="email"
                value={email}
                onChange={e => this.handleInputChange("email", e)}
                placeholder="email"
                fullWidth
                required
              />
              <StyledInput
                type="password"
                value={password}
                onChange={e => this.handleInputChange("password", e)}
                placeholder="password"
                fullWidth
                required
              />
              <StyledInput
                type="password"
                value={confirmPassword}
                onChange={e => this.handleInputChange("confirmPassword", e)}
                placeholder="confirm password"
                fullWidth
                required
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginTop: "2rem" }}
              >
                Register
              </Button>
            </Form>
            <TermsLinks>
              <span>
                By registering you automatically accept the following:
              </span>
              <Link to="/register">
                <span>Terms and Conditions</span>
              </Link>
              <Link to="/register">
                <span>Privacy policy</span>
              </Link>
            </TermsLinks>
            <TermsLinks>
              Already have an account?
              <Link to="/">Login</Link>
            </TermsLinks>
          </FormContainer>
        </FormSection>
      </Container>
    );
  }
}

export default RegisterPage;
