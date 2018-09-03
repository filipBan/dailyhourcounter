import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./style.css";

class SettingsScreen extends Component {
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return <div className="settings-screen-container">Settings</div>;
  }
}

export default SettingsScreen;
