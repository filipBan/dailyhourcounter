import React from "react";
import PropTypes from "prop-types";

import { DatePicker } from "material-ui-pickers";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarToday from "@material-ui/icons/CalendarToday";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 7rem;
`;

const Title = styled.span`
  margin-left: 1rem;
  font-size: 2rem;
  min-width: 15rem;
`;

const StyledAppbar = styled(AppBar)`
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem 1rem;
  height: 6rem;
`;

const Calendar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const TopBar = ({
  handleCalendarChange,
  toggleDrawer,
  today,
  title,
  showCalendar
}) => {
  const changeCalendarDate = date => {
    handleCalendarChange(date);
  };

  const openPicker = e => {
    picker.open(e);
  };

  let picker = null;

  return (
    <Container>
      <StyledAppbar position="static">
        <IconButton
          color="inherit"
          aria-label="menu-toggle"
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        {title && <Title>{title}</Title>}
        {showCalendar && (
          <Calendar>
            <IconButton
              color="inherit"
              aria-label="calendar-toggle"
              onClick={openPicker}
            >
              <CalendarToday />
            </IconButton>
            <div style={{ display: "none" }} aria-label="top-bar-calendar">
              <DatePicker
                value={today}
                onChange={changeCalendarDate}
                animateYearScrolling
                showTodayButton
                ref={node => {
                  picker = node;
                }}
              />
            </div>
          </Calendar>
        )}
      </StyledAppbar>
    </Container>
  );
};

TopBar.propTypes = {
  handleCalendarChange: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  showCalendar: PropTypes.bool
};

TopBar.defaultProps = {
  showCalendar: false
};

export default TopBar;
