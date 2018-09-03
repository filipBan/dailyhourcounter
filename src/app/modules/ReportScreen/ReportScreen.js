import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "./style.css";

class ReportScreen extends Component {
  state = {
    isStartOpen: false,
    isEndOpen: false
  };
  toggleDatePicker = period => {
    if (period === "start") {
      this.setState(({ isStartOpen }) => ({
        isStartOpen: !this.state.isStartOpen
      }));
    } else if (period === "end") {
      this.setState(({ isEndOpen }) => ({ isEndOpen: !this.state.isEndOpen }));
    }
  };

  changeDate = (period, date) => {
    const { changeStartDay, changeEndDay } = this.props;
    return period === "start" ? changeStartDay(date) : changeEndDay(date);
  };
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="report-screen-container">
        <Segment>
          <Button onClick={() => this.toggleDatePicker("start")}>Start</Button>
          {this.state.isStartOpen && <DatePicker withPortal inline />}
          <Button onClick={() => this.toggleDatePicker("end")}>End</Button>
          {this.state.isEndOpen && <DatePicker withPortal inline />}
        </Segment>
      </div>
    );
  }
}

export default ReportScreen;
