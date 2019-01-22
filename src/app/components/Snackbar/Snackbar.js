import React from "react";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

import styled from "styled-components";

const getBgColor = type => {
  switch (type) {
    case "error":
      return "#f44336";
    case "success":
      return "#43a047";
    default:
      return "rgba(0, 0, 0, 0.2)";
  }
};

const StyledSnackbarContent = styled(SnackbarContent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ type }) => getBgColor(type)} !important;
  flex-direction: row;
  border-radius: 0.5rem;

  #client-snackbar {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    #message {
      margin-left: 1rem;
    }
  }
`;

const StyledSnackbar = styled(Snackbar)`
  margin: 2rem;
  border-radius: 1rem;
  max-width: 35rem;
  @media only screen and (min-width: 800px) {
    & {
      margin: 2rem auto;
    }
  }
`;

const SnackbarWrapper = ({ message, type, resetSnackbar }) => {
  return (
    <StyledSnackbar
      open={Boolean(message)}
      onClose={resetSnackbar}
      autoHideDuration={6000}
      aria-label="snackbar"
    >
      <StyledSnackbarContent
        aria-describedby="client-snackbar"
        type={type}
        message={
          message && (
            <div id="client-snackbar">
              <ErrorIcon />
              <span id="message">{message}</span>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={resetSnackbar}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )
        }
      />
    </StyledSnackbar>
  );
};

export default SnackbarWrapper;
