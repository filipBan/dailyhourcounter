import React, { Component } from "react";

import { DatePicker } from "material-ui-pickers";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarToday from "@material-ui/icons/CalendarToday";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

class TopBar extends Component {
  changeCalendarDate = date => {
    const { handleCalendarChange, toggleCalendar } = this.props;
    handleCalendarChange(date);
    toggleCalendar();
  };

  openPicker = e => {
    // do not pass Event for default pickers
    this.picker.open(e);
  };

  render() {
    const { toggleDrawer, today } = this.props;
    return (
      <Container>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
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
                ref={node => {
                  this.picker = node;
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }
}

export default TopBar;
