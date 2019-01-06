import React, { Component, Fragment } from "react";

import { DatePicker } from "material-ui-pickers";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarToday from "@material-ui/icons/CalendarToday";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  /* @media only screen and (max-width: 800px) {
    & {
      display: none;
    }
  } */
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
    const { toggleDrawer, today, match } = this.props;

    return (
      <Container>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {match.path === "/today" && (
              <Fragment>
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
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    );
  }
}

export default TopBar;
