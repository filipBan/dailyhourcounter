import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/CloseOutlined";

import Button from "@material-ui/core/Button";

const Container = styled.div`
  min-width: 16rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  font-size: 1.6rem;
  height: 4.5rem;

  background-color: ${props => props.coloroverride};
`;

const DeleteBadge = styled.div`
  position: absolute;
  top: 0rem;
  right: 0rem;
  width: 2.6rem;
  height: 4.5rem;
  border: 1px solid #ffcdd2;
  z-index: 2;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  color: #e57373;
  margin: 0 !important;
  display: flex;
  align-items: center;

  &:active {
    background-color: #e57373;
    transition: background-color 0.3s;
    transition-timing-function: ease-out;
  }
`;

const DisabledBadge = styled(DeleteBadge)`
  border: 1px solid #ddd;
  color: #ddd;
`;

const SharedButton = ({ onDelete, deleteBadge, disabled, ...other }) => {
  return (
    <Container>
      {deleteBadge && !disabled && (
        <DeleteBadge onClick={onDelete} aria-label="delete-badge">
          <CloseIcon />
        </DeleteBadge>
      )}
      {deleteBadge && disabled && (
        <DisabledBadge>
          <CloseIcon />
        </DisabledBadge>
      )}
      <StyledButton {...other} disabled={disabled}>
        {other.children}
      </StyledButton>
    </Container>
  );
};

SharedButton.propTypes = {
  onDelete: PropTypes.func,
  deleteBadge: PropTypes.bool,
  disabled: PropTypes.bool
};

SharedButton.defaultProps = {
  onDelete: () => {},
  deleteBadge: false,
  disabled: false
};

export default SharedButton;
