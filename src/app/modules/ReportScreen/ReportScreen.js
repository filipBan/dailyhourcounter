import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "moment/locale/en-gb";

import SaveButton from "../../components/SaveButton";

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
    const { changeReportStartDay, changeReportEndDay } = this.props;
    period === "start" ? changeReportStartDay(date) : changeReportEndDay(date);
    this.toggleDatePicker(period);
  };

  calculateReportSummary = reportData => {
    if (reportData) {
      const totalHours = reportData
        .map(day => (day ? day.hours : 0))
        .reduce((a, b) => a + b, 0);

      const totalBreaks = reportData
        .map(day => (day ? day.breaks : 0))
        .reduce((a, b) => a + b, 0);

      const toBePaid = reportData
        .map(day => {
          if (day) {
            return (day.hours - day.breaks) * day.wages;
          }
          return 0;
        })
        .reduce((a, b) => a + b, 0);

      const hoursPayable = totalHours - totalBreaks;

      return { totalHours, totalBreaks, hoursPayable, toBePaid };
    }
  };

  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const { fetchDateRangeData } = this.props;
    const { reportStartDate, reportEndDate, reportData } = this.props.reports;
    const { uid } = this.props.auth;

    const reportSummary = this.calculateReportSummary(reportData);

    return (
      <div className="report-screen-container">
        <div className="report-dates-container">
          <Segment className="report-dates">
            <div>
              <Button
                size="big"
                basic
                color="blue"
                className="custom-input"
                onClick={() => this.toggleDatePicker("start")}
              >
                {reportStartDate
                  ? format(reportStartDate, "d/M/yyyy")
                  : "Start"}
              </Button>
              {this.state.isStartOpen && (
                <DatePicker
                  withPortal
                  inline
                  onChange={date => this.changeDate("start", date)}
                  locale="en-gb"
                />
              )}
              <Button
                size="big"
                basic
                color="blue"
                className="custom-input"
                onClick={() => this.toggleDatePicker("end")}
                disabled={!reportStartDate}
              >
                {reportEndDate ? format(reportEndDate, "d/M/yyyy") : "End"}
              </Button>
              {this.state.isEndOpen && (
                <DatePicker
                  withPortal
                  inline
                  onChange={date => this.changeDate("end", date)}
                  locale="en-gb"
                  minDate={reportStartDate}
                />
              )}
            </div>
            <Button
              primary
              onClick={() =>
                fetchDateRangeData(reportStartDate, reportEndDate, uid)
              }
            >
              PREPARE THE REPORT
            </Button>
          </Segment>
        </div>

        <div className="report-summary-container">
          <Segment className="report-summary">
            {reportData && (
              <div className="table-container">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Hours worked</td>
                      <td>{reportSummary.totalHours}</td>
                    </tr>
                    <tr>
                      <td>Breaks</td>
                      <td>{reportSummary.totalBreaks}</td>
                    </tr>
                    <tr>
                      <td>Total hours</td>
                      <td>{reportSummary.hoursPayable}</td>
                    </tr>
                    <tr>
                      <td>To be paid</td>
                      <td>£{reportSummary.toBePaid.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Segment>
        </div>
        {/* <SaveButton disabled /> */}
      </div>
    );
  }
}

export default ReportScreen;
