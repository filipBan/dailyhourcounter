import React, { Component } from "react";
import PropTypes from "prop-types";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Today from "@material-ui/icons/Today";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Person from "@material-ui/icons/Person";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const SideDrawer = ({ toggleDrawer, logoutUser, history, visible }) => {
  const handleLogOut = () => {
    toggleDrawer(false);
    logoutUser();
  };

  const toggleSwipeDrawer = open => () => {
    toggleDrawer(open);
  };

  const handleRedirect = page => {
    toggleDrawer(false);
    history.push(page);
  };

  return (
    <SwipeableDrawer
      open={visible}
      onClose={toggleSwipeDrawer(false)}
      onOpen={toggleSwipeDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      aria-label="side-drawer"
    >
      <List>
        <ListItem
          button
          onClick={() => handleRedirect("/today")}
          style={{ padding: "2rem" }}
        >
          <ListItemIcon>
            <Today />
          </ListItemIcon>
          <ListItemText
            primary={"Today"}
            primaryTypographyProps={{ variant: "h5" }}
          />
        </ListItem>

        <ListItem
          button
          onClick={() => handleRedirect("/reports")}
          style={{ padding: "2rem" }}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText
            primary={"Reports"}
            primaryTypographyProps={{ variant: "h5" }}
          />
        </ListItem>

        <ListItem
          button
          onClick={() => handleRedirect("/profile")}
          style={{ padding: "2rem" }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText
            primary={"Profile"}
            primaryTypographyProps={{ variant: "h5" }}
          />
        </ListItem>

        <ListItem
          button
          onClick={() => handleLogOut()}
          style={{ padding: "2rem" }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            primary={"Log out"}
            primaryTypographyProps={{ variant: "h5" }}
          />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

SideDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
};

export default SideDrawer;
