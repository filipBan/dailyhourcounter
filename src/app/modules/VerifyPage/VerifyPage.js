import React from "react";

import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";

import styled from "styled-components";
import Button from "../../components/Button";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  background-color: #89cff0;
`;

const StyledCard = styled(Card)`
  max-width: 40rem;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: "Bungee", cursive;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const ErrorPage = props => {
  if (props.checkingAuthState || !props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (props.isLoggedIn && props.emailVerified && !props.checkingAuthState) {
    return <Redirect to="/today" />;
  }

  return (
    <Container>
      <Logo>
        <span>Daily</span>
        <span>Hours</span>
      </Logo>
      <StyledCard>
        <h3>Welcome :)</h3>
        <p>
          Please check your email and click on the link there to verify it. Once
          it's done simply refresh this page.
        </p>
        <p>
          If you want to try again later then click on the button below and log
          in with provided details whenever you have a moment.
        </p>
        <Button variant="outlined" onClick={props.logoutUser}>
          Logout
        </Button>
      </StyledCard>
    </Container>
  );
};

export default ErrorPage;
