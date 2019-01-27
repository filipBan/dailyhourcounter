import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ConfirmationDialog from "./ConfirmationDialog";
import TopBar from "../../../components/TopBar";

const SideDrawer = React.lazy(() => import("../../../components/SideDrawer"));

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£"
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
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

const StyledButton = styled(Button)`
  text-transform: none !important;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  text-align: center;
  padding: 1rem 0 2rem 0;
`;

const StyledTextField = styled(TextField)`
  width: 6rem;
`;

// TODO - add date format change option

const ProfilePage = ({
  name,
  wages,
  email,
  loading,
  sendResetPasswordEmail,
  deleteUser,
  toggleConfirmationDialog,
  dialogOpen,
  updateWagesInput,
  saveWagesInDatabase,
  uid,
  currency,
  changeCurrency
}) => {
  return (
    <Container>
      <TopBar title="Profile" />
      <InnerContainer>
        <Content>
          <Progress>{loading && <LinearProgress />}</Progress>
          <Title>{name ? `Hi ${name}` : " "}</Title>
          <Row>
            <p>Hourly wage</p>
            <StyledTextField
              id="standard-select-currency-native"
              select
              value={currency}
              onChange={e => changeCurrency(e.target.value)}
              SelectProps={{
                native: true
              }}
              margin="normal"
            >
              {Object.values(currencies).map(curr => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </StyledTextField>
            <StyledTextField
              label=" "
              type="number"
              value={wages}
              onChange={e => updateWagesInput(e.target.value)}
            />
            <StyledButton
              variant="outlined"
              color="primary"
              onClick={() => saveWagesInDatabase(wages, currency, uid)}
            >
              Save
            </StyledButton>
          </Row>
          <Divider />
          <Row>
            <StyledButton onClick={() => sendResetPasswordEmail(email)}>
              Reset password
            </StyledButton>
          </Row>
          <Divider />
          <Row>
            <StyledButton onClick={() => toggleConfirmationDialog()}>
              Delete account
            </StyledButton>
          </Row>
        </Content>
      </InnerContainer>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={toggleConfirmationDialog}
        deleteUser={deleteUser}
      />
      <SideDrawer />
    </Container>
  );
};

ProfilePage.propTypes = {
  name: PropTypes.string.isRequired,
  wages: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  sendResetPasswordEmail: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  toggleConfirmationDialog: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  updateWagesInput: PropTypes.func.isRequired,
  saveWagesInDatabase: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired
};

export default ProfilePage;
