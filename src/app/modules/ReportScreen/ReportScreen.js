import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Segment, Table } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "moment/locale/en-gb";

import SaveButton from "../../components/SaveButton";

import "./style.css";

class ReportScreen extends Component {
  state = {
    isStartOpen: false,
    isEndOpen: false
  };

  toggleDatePicker = period => {
    console.log("click", period);
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

      const hoursPayable = totalHours - totalBreaks;
      const toBePaid = reportData.map(day => {});

      return { totalHours, totalBreaks, hoursPayable };
    }
  };

  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const { fetchDateRangeData } = this.props;
    const { reportStartDate, reportEndDate, reportData } = this.props.reports;
    const { uid } = this.props.auth;

    console.log(reportData);

    const reportSummary = this.calculateReportSummary(reportData);

    console.log(reportSummary);

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
                {reportStartDate ? reportStartDate.format("D/M/YYYY") : "Start"}
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
                {reportEndDate ? reportEndDate.format("D/M/YYYY") : "End"}
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
              <Table celled singleLine>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Hours worked</Table.Cell>
                    <Table.Cell>{reportSummary.totalHours}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Breaks</Table.Cell>
                    <Table.Cell>{reportSummary.totalBreaks}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total hours</Table.Cell>
                    <Table.Cell>{reportSummary.hoursPayable}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            )}
          </Segment>
        </div>
        <SaveButton disabled />
      </div>
    );
  }
}

export default ReportScreen;
