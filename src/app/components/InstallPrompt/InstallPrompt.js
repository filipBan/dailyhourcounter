import React from "react";
import PropTypes from "prop-types";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const StyledSnackbarContent = styled(SnackbarContent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white !important;
  flex-direction: row;

  #client-snackbar,
  #update-snackbar {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;

    #message {
      font-size: 1.4rem;
    }
  }
`;

const ImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
  margin-left: 1rem;

  img {
    width: 4rem;
    height: 4rem;
  }
`;

const StyledSnackbar = styled(Snackbar)`
  margin: 2rem;
  max-width: 35rem;
  @media only screen and (min-width: 800px) {
    & {
      margin: 2rem auto;
    }
  }
`;

// TODO - that should be one with the snackbar component, it should
// become the hub for all messages etc, more customizable etc

const InstallPrompt = ({
  installPromptOpen,
  toggleInstallPrompt,
  showInstallInstructions
}) => {
  return (
    <StyledSnackbar
      open={installPromptOpen}
      onClose={toggleInstallPrompt}
      aria-label="snackbar"
    >
      <StyledSnackbarContent
        aria-describedby="client-snackbar"
        message={
          <div id="client-snackbar">
            <ImageContainer>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/dailyhourcounter.appspot.com/o/icon-512.png?alt=media&token=dd7532c8-e9e1-43e4-880e-1603a5475332"
                alt="app logo"
              />
            </ImageContainer>
            <Button
              id="message"
              size="medium"
              color="primary"
              onClick={showInstallInstructions}
            >
              Add Daily Hours to your homescreen
            </Button>
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={toggleInstallPrompt}
            >
              <CloseIcon />
            </IconButton>
          </div>
        }
      />
    </StyledSnackbar>
  );
};

InstallPrompt.propTypes = {
  installPromptOpen: PropTypes.bool.isRequired,
  toggleInstallPrompt: PropTypes.func.isRequired,
  showInstallInstructions: PropTypes.func.isRequired
};

export default InstallPrompt;
