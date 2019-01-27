import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled(Paper)`
  width: 35rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 2rem;

  h2 {
    padding: 0;
    margin: 0;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledButton = styled(Button)`
  background-color: red;
  border: 5px solid #272727;
  font-size: 1.6rem;
`;

const Notification = ({
  closeNotificationModal,
  notification,
  userId,
  modalOpen
}) => {
  const closeModal = () => {
    closeNotificationModal(userId, notification.id);
  };

  const { header, subheader, content, footer } = notification;
  return (
    <StyledModal open={modalOpen}>
      <Content>
        <h2>{header}</h2>
        <p>{subheader}</p>
        <span>{content}</span>
        <p>{footer}</p>
        <CloseButton>
          <IconButton color="inherit" aria-label="Close" onClick={closeModal}>
            <Close />
          </IconButton>
        </CloseButton>
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={closeModal}
        >
          Let's go
        </StyledButton>
      </Content>
    </StyledModal>
  );
};

Notification.propTypes = {
  closeNotificationModal: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  notification: PropTypes.shape({
    header: PropTypes.string,
    subheader: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string
  })
};

Notification.defaultProps = {
  notification: {
    header: "",
    subheader: "",
    content: "",
    footer: ""
  }
};

export default Notification;
