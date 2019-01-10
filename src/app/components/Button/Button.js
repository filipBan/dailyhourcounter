import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Container = styled.div`
  min-width: 16rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  font-size: 1.6rem;

  background-color: ${props => props.coloroverride};
`;

const DeleteBadge = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  z-index: 2;
  border-radius: 50%;
  border: 1px solid red;
  color: red;
  display: flex;
  justify-content: center;
  align-content: center;

  &:active {
    background-color: red;
    transition: background-color 0.3s;
    transition-timing-function: ease-out;
  }
`;

const SharedButton = props => {
  return (
    <Container>
      {props.deleteBadge && (
        <DeleteBadge onClick={props.onDelete}>x</DeleteBadge>
      )}
      <StyledButton {...props}>{props.children}</StyledButton>
    </Container>
  );
};

export default SharedButton;
