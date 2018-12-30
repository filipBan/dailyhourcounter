import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
  min-width: 10rem;
`;

const SharedButton = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default SharedButton;
