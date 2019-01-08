import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";

import Button from "../../../components/Button";

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
    const { wages } = this.props.settings;

    return (
      <div className="settings-screen-container">
        <div className="wages">
          <div className="settings">
            <span>Salary</span>
            <Input
              type="number"
              label={{ basic: true, content: "£" }}
              labelPosition="left"
              placeholder="Enter your salary"
              value={wages}
              onChange={e => this.handleUpdateWagesInput(e)}
            />
          </div>
        </div>
        <Button onClick={() => this.handleSaveNewWages()}>SAVE</Button>
      </div>
    );
  }
}

export default SettingsScreen;
