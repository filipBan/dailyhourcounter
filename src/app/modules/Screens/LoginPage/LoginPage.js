import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";

import styled from "styled-components";

import Button from "../../../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #89cff0;
  height: 100vh;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 2;
  font-family: "Bungee", cursive;
  font-size: 7rem;
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

const RegisterLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`;

const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 30rem;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem 3rem;
`;

const StyledInput = styled(Input)`
  input {
    font-size: 1.6rem;
  }
`;

class LoginPage extends Component {
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

    const { email, password } = this.props;
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
              >
                Login
              </Button>
            </Form>
            <RegisterLinks>
              <span>Don't have an account?</span>
              <Link to="/register">
                <span>Register here.</span>
              </Link>
            </RegisterLinks>
          </FormContainer>
        </FormSection>
      </Container>
    );
  }
}

export default LoginPage;
