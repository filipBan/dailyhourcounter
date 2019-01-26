import React, { Component } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import TopBar from "../../../components/TopBar";

const SideDrawer = React.lazy(() => import("../../../components/SideDrawer"));

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const Section = styled(Card)`
  margin-bottom: 1rem;
  min-height: 5rem;
  padding: 2rem 0;
  text-align: center;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  padding: 0 1rem;
`;

const Progress = styled.div`
  width: 100%;
  height: 1rem;
`;

const Divider = styled.div`
  width: 90%;
  border-bottom: 1px solid #ddd;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Content = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    min-height: 3rem;
    line-height: 3rem;
  }
`;

const StyledInput = styled(Input)`
  input {
    width: 6rem;
    font-size: 1.6rem;
    text-align: center;
  }
`;

class ProfilePage extends Component {
  render() {
    const { name, wages, email, loading, sendResetPasswordEmail } = this.props;

    console.log({ name, wages, email });
    return (
      <Container>
        <TopBar title="Profile" />
        <InnerContainer>
          <Content>
            <Progress>{loading && <LinearProgress />}</Progress>
            <p>{name ? `Hi ${name}` : " "}</p>
            <p>
              Wages: <StyledInput label="wages" type="number" value={wages} />
            </p>
            <Divider />
            <p>Change currency?</p>
            <Divider />
            <Button onClick={() => sendResetPasswordEmail(email)}>
              Reset password
            </Button>
            <Divider />
            <Button>Delete account</Button>
          </Content>
        </InnerContainer>

        <SideDrawer />
      </Container>
    );
  }
}

export default ProfilePage;
