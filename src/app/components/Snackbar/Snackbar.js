import React from "react";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

import styled from "styled-components";

const StyledSnackbarContent = styled(SnackbarContent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: red;
  flex-direction: row;
  border-radius: 0.5rem;

  #client-snackbar {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    #error-message {
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

const SnackbarWrapper = ({ onClose, error }) => {
  return (
    <StyledSnackbar open={error}>
      <StyledSnackbarContent
        aria-describedby="client-snackbar"
        message={
          error && (
            <div id="client-snackbar">
              <ErrorIcon />
              <span id="error-message">{error}</span>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={onClose}
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
