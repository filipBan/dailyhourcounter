import React, { Component } from "react";
import styled from "styled-components";

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

class ProfilePage extends Component {
  render() {
    return (
      <Container>
        <TopBar title="Profile" />
        <SideDrawer />
      </Container>
    );
  }
}

export default ProfilePage;
