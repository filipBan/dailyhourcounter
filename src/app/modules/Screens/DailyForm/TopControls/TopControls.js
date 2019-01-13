import React from "react";
import { addDays, format, subDays } from "date-fns";

import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

import styled from "styled-components";

const Container = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  span {
    font-size: 1.6rem;
  }
`;

const TopControls = ({ handleCalendarChange, today }) => {
  return (
    <Container aria-label="top-controls">
      <IconButton
        color="inherit"
        aria-label="date-back"
        onClick={() => handleCalendarChange(subDays(today, 1))}
      >
        <ChevronLeft />
      </IconButton>
      <span>{format(today, "EEEE do MMM yyyy").toString()}</span>
      <IconButton
        color="inherit"
        aria-label="date-forward"
        onClick={() => handleCalendarChange(addDays(today, 1))}
      >
        <ChevronRight />
      </IconButton>
    </Container>
  );
};

export default TopControls;
