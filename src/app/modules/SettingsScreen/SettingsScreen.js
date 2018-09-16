import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Segment, Input } from "semantic-ui-react";

import SaveButton from "../../components/SaveButton";

import "./style.css";

class SettingsScreen extends Component {
  handleUpdateWagesInput = e => {
    const { updateWagesInput } = this.props;
    updateWagesInput(e.target.value);
  };

  handleSaveNewWages = () => {
    const { uid } = this.props.auth;
    const { wages } = this.props.settings;
    const { updateWages } = this.props;
    updateWages(wages, uid);
  };

  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const { wages } = this.props.settings;

    return (
      <div className="settings-screen-container">
        <div className="wages">
          <Segment className="settings">
            <span>Salary</span>
            <Input
              type="number"
              label={{ basic: true, content: "£" }}
              labelPosition="left"
              placeholder="Enter your salary"
              value={wages}
              onChange={e => this.handleUpdateWagesInput(e)}
            />
          </Segment>
        </div>
        <SaveButton onClick={() => this.handleSaveNewWages()} />
      </div>
    );
  }
}

export default SettingsScreen;
