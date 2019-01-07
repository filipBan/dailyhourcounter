import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { DatePicker } from "material-ui-pickers";

import TopBar from "../TopBar";

import Button from "../../components/Button";

const StyledTable = styled(Table)`
  th {
    font-size: 1.4rem;
  }

  td {
    font-size: 1.2rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;

  div:first-child {
    margin-right: 0.5rem;
  }

  div:nth-child(2) {
    margin-left: 0.5rem;
  }
`;

const Section = styled(Card)`
  margin-bottom: 1rem;
  min-height: 5rem;
  padding: 2rem 0;
  text-align: center;
`;

const TableContainer = styled(Card)`
  margin-bottom: 1rem;
  min-height: 5rem;
  text-align: center;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  padding: 0 1rem;
`;

const Progress = styled.div`
  width: 100%;
  height: 1rem;
`;

// TODO - split this component up, it's too big
class ReportScreen extends Component {
  openPicker = (e, node) => {
    node.open(e);
  };

  changeDate = (period, date) => {
    const { changeReportStartDay, changeReportEndDay } = this.props;
    period === "start" ? changeReportStartDay(date) : changeReportEndDay(date);
  };

  formatMinutesToHours = minutes =>
    minutes
      ? `${Math.floor(minutes / 60)}:${minutes % 60 > 0 ? minutes % 60 : "00"}`
      : 0;

  getDayPayment = day =>
    ((day.workedMinutes - day.breakMinutes) / 60) * day.wages;

  calculateReportSummary = reportData => {
    if (reportData) {
      const totalWorkedMinutes = reportData
        .map(day => (day ? day.workedMinutes : 0))
        .reduce((a, b) => a + b, 0);

      const totalBreaksMinutes = reportData
        .map(day => (day ? day.breakMinutes : 0))
        .reduce((a, b) => a + b, 0);

      const toBePaid = parseFloat(
        reportData
          .map(day => {
            if (day) {
              return this.getDayPayment(day);
            }
            return 0;
          })
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
      );

      const minutesPayable = totalWorkedMinutes - totalBreaksMinutes;

      const hours = this.formatMinutesToHours(totalWorkedMinutes);

      const breaks = this.formatMinutesToHours(totalBreaksMinutes);

      const payable = this.formatMinutesToHours(minutesPayable);

      return {
        hours,
        breaks,
        payable,
        toBePaid
      };
    }
  };

  render() {
    const { fetchDateRangeData } = this.props;
    const {
      reportStartDate,
      reportEndDate,
      reportData,
      fetching
    } = this.props.reports;
    const { uid } = this.props.auth;

    const reportSummary = this.calculateReportSummary(reportData);

    return (
      <Container>
        <TopBar title="Reports" />
        <Progress>{fetching && <LinearProgress />}</Progress>
        <SectionContainer>
          <Section>
            <ButtonContainer>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={e => this.openPicker(e, this.hoursStart)}
              >
                {reportStartDate
                  ? format(reportStartDate, "do MMM y")
                  : "Start"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={e => this.openPicker(e, this.hoursEnd)}
              >
                {reportEndDate ? format(reportEndDate, "do MMM y") : "End"}
              </Button>
              <div style={{ display: "none" }}>
                <DatePicker
                  onChange={date => this.changeDate("start", date)}
                  ref={node => {
                    this.hoursStart = node;
                  }}
                />
                <DatePicker
                  onChange={date => this.changeDate("end", date)}
                  ref={node => {
                    this.hoursEnd = node;
                  }}
                />
              </div>
            </ButtonContainer>

            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                fetchDateRangeData(reportStartDate, reportEndDate, uid)
              }
            >
              Prepare the report
            </Button>
          </Section>
        </SectionContainer>
        {reportData && (
          <SectionContainer>
            <TableContainer>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense" align="left">
                      Hours
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      Breaks
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      Net hours
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      Payment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell padding="dense" align="left">
                      {reportSummary.hours}
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      {reportSummary.breaks}
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      {reportSummary.payable}
                    </TableCell>
                    <TableCell padding="dense" align="left">
                      {reportSummary.toBePaid}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </StyledTable>
              <p>Details</p>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense" align="left">
                      Day
                    </TableCell>
                    <TableCell padding="none" align="left">
                      Hours
                    </TableCell>
                    <TableCell padding="none" align="left">
                      Breaks
                    </TableCell>
                    <TableCell padding="none" align="left">
                      Payment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map(row => {
                    return (
                      <TableRow key={row.date}>
                        <TableCell padding="dense">
                          {format(row.date, "do MMM y")}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {this.formatMinutesToHours(row.workedMinutes)}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {this.formatMinutesToHours(row.breakMinutes)}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {this.getDayPayment(row).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </SectionContainer>
        )}
      </Container>
    );
  }
}

export default ReportScreen;
