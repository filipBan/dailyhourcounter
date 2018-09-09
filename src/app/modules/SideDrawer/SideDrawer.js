import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

class SideDrawer extends Component {
  handleClickOutside = () => {
    const { toggleDrawer, visible } = this.props;
    if (visible) {
      toggleDrawer();
    }
  };

  handleLogOut = () => {
    const { toggleDrawer, logoutUser } = this.props;
    toggleDrawer();
    logoutUser();
  };

  render() {
    const { toggleDrawer, visible } = this.props;
    const left = visible ? { left: 0 } : { left: "-235px" };
    return (
      <div className="side-drawer-container" style={left}>
        <Menu vertical fluid className="side-menu" size="massive">
          <Link to="/today" onClick={toggleDrawer}>
            <Menu.Item className="side-menu-item">
              <Icon name="calendar plus outline" className="side-menu-icon" />
              Today
            </Menu.Item>
          </Link>
          <Link to="/reports" onClick={toggleDrawer}>
            <Menu.Item className="side-menu-item">
              <Icon name="chart line" className="side-menu-icon" />
              Reports
              <Icon
                circular
                color="blue"
                name="exclamation"
                className="new-icon"
              />
            </Menu.Item>
          </Link>
          <Link to="/settings" onClick={toggleDrawer}>
            <Menu.Item className="side-menu-item">
              <Icon name="setting" className="side-menu-icon" />
              Settings
              <Icon
                circular
                color="blue"
                name="exclamation"
                className="new-icon"
              />
            </Menu.Item>
          </Link>
          <Menu.Item
            className="side-menu-item"
            onClick={() => this.handleLogOut()}
          >
            <Icon name="setting" className="side-menu-icon" />
            Log out
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default onClickOutside(SideDrawer);
