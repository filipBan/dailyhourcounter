import React, { Component } from "react";

import { DatePicker } from "material-ui-pickers";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarToday from "@material-ui/icons/CalendarToday";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
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
`;

const Calendar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

class TopBar extends Component {
  changeCalendarDate = date => {
    const { handleCalendarChange } = this.props;
    handleCalendarChange(date);
  };

  openPicker = e => {
    this.picker.open(e);
  };

  render() {
    const { toggleDrawer, today, title, showCalendar } = this.props;

    return (
      <Container>
        <StyledAppbar position="static">
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {title && <Title>{title}</Title>}
          {showCalendar && (
            <Calendar>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.openPicker}
              >
                <CalendarToday />
              </IconButton>
              <div style={{ display: "none" }}>
                <DatePicker
                  value={today}
                  onChange={this.changeCalendarDate}
                  animateYearScrolling
                  showTodayButton
                  ref={node => {
                    this.picker = node;
                  }}
                />
              </div>
            </Calendar>
          )}
        </StyledAppbar>
      </Container>
    );
  }
}

export default TopBar;
