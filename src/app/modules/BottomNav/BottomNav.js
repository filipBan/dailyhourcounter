import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import TrendingUp from "@material-ui/icons/TrendingUp";
import Settings from "@material-ui/icons/Settings";
import Person from "@material-ui/icons/Person";

const styles = {
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%"
  },
  label: {
    fontSize: "1.4rem"
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleLink = location => {
    const { history } = this.props;
    history.push(location);
  };

  render() {
    const { value } = this.state;
    const { classes, location } = this.props;

    if (location.pathname === "/") {
      return null;
    }

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        classes={{ root: classes.root }}
      >
        <BottomNavigationAction
          label="Today"
          icon={<Person />}
          classes={{
            label: classes.label
          }}
          onClick={() => this.handleLink("/today")}
        />
        <BottomNavigationAction
          label="Reports"
          icon={<TrendingUp />}
          classes={{
            label: classes.label
          }}
          onClick={() => this.handleLink("/reports")}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<Settings />}
          classes={{
            label: classes.label
          }}
          onClick={() => this.handleLink("/settings")}
        />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(withRouter(SimpleBottomNavigation));
