import React from "react";

import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";

import styled from "styled-components";
import Button from "../../../components/Button";

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
  position: relative;
`;

const Progress = styled.div`
  width: 100%;
  height: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    margin: 1rem;
  }
`;

const VerifyPage = props => {
  const { loading } = props;
  if (props.isLoggedIn && props.emailVerified && !props.checkingAuthState) {
    return <Redirect to="/today" />;
  }

  const logOut = async () => {
    await props.logoutUser();
    return props.history.push("/");
  };

  return (
    <Container>
      <Logo>
        <span>Daily</span>
        <span>Hours</span>
      </Logo>
      <StyledCard>
        <Progress>{loading && <LinearProgress />}</Progress>
        <h3>Welcome :)</h3>
        <p>
          Please check your email and click on the link there to verify it. Once
          it's done simply refresh this page.
        </p>
        <p>
          If you want to try again later then click on the button below and log
          in with provided details whenever you have a moment.
        </p>
        <ButtonContainer>
          <Button
            disabled={loading}
            fullWidth
            variant="outlined"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
          <Button
            disabled={loading}
            fullWidth
            variant="outlined"
            onClick={logOut}
          >
            Logout
          </Button>
        </ButtonContainer>
        <p>If you have not received the email, click here to send a new one.</p>
        <Button
          disabled={loading}
          variant="outlined"
          onClick={props.sendEmailVerification}
        >
          Send a new email
        </Button>
      </StyledCard>
    </Container>
  );
};

export default VerifyPage;
