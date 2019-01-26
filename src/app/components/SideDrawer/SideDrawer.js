import React, { Component } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Today from "@material-ui/icons/Today";
import Settings from "@material-ui/icons/Settings";
import Person from "@material-ui/icons/Person";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class SideDrawer extends Component {
  handleLogOut = () => {
    const { toggleDrawer, logoutUser } = this.props;
    toggleDrawer(false);
    logoutUser();
  };

  toggleSwipeDrawer = open => () => {
    this.props.toggleDrawer(open);
  };

  handleRedirect = page => {
    this.props.toggleDrawer(false);
    this.props.history.push(page);
  };

  render() {
    const { visible } = this.props;
    return (
      <SwipeableDrawer
        open={visible}
        onClose={this.toggleSwipeDrawer(false)}
        onOpen={this.toggleSwipeDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        aria-label="side-drawer"
      >
        <List>
          <ListItem
            button
            onClick={() => this.handleRedirect("/today")}
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
            onClick={() => this.handleRedirect("/reports")}
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
            onClick={() => this.handleRedirect("/profile")}
            style={{ padding: "2rem" }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary={"Profile"}
              primaryTypographyProps={{ variant: "h5" }}
            />
          </ListItem>

          <ListItem
            button
            onClick={() => this.handleLogOut()}
            style={{ padding: "2rem" }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText
              primary={"Log out"}
              primaryTypographyProps={{ variant: "h5" }}
            />
          </ListItem>
        </List>
      </SwipeableDrawer>
    );
  }
}

export default SideDrawer;
