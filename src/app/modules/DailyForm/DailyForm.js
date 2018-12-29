import React, { Component } from "react";
import { endOfDay, subMinutes } from "date-fns";
import { Redirect } from "react-router-dom";

import { Button, Segment, Divider } from "semantic-ui-react";

import styled from "styled-components";

import TopBar from "../TopBar";

import TimePicker from "../../components/TimePicker";
import SaveButton from "../../components/SaveButton";

import TopControls from "./TopControls";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const DailyFormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 0;
`;

const HoursContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

// TODO - split this component up, it's too big
class DailyForm extends Component {
  componentDidMount() {
    const { uid, today, fetchDailyData } = this.props;
    fetchDailyData({ uid, today });
  }

  componentDidUpdate(prevProps) {
    if (this.props.today !== prevProps.today) {
      const { uid, today, fetchDailyData } = this.props;
      fetchDailyData({ uid, today });
    }
  }

  calculateTotalHours = () => {
    const { timeWorked, totalBreaks } = this.props;
    return timeWorked - totalBreaks;
  };

  getBreakMaxTime = () => {
    const { workStart, workEnd, today } = this.props;
    let newTime = workEnd;
    return workStart < workEnd ? newTime : subMinutes(endOfDay(today), 59);
  };

  render() {
    const {
      workStart,
      workEnd,
      breakStart,
      breakEnd,
      timeWorked,
      totalBreaks,
      updateBreaks,
      updateHours,
      savingData,
      saveHoursAndBreaksToFirebase,
      today,
      handleCalendarChange,
      resetDailyData,
      uid
    } = this.props;

    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const breakMaxTime = this.getBreakMaxTime();

    return (
      <DailyFormContainer>
        <TopBar />
        <HoursContainer>
          <TopControls
            handleCalendarChange={handleCalendarChange}
            today={today}
          />
          <Segment raised size="huge" className="hours-segment">
            <div className="work-hours">
              <h3>Hours</h3>
              <div className="from-to-container">
                <TimePicker
                  placeholder="Start"
                  time={workStart}
                  onChange={date => updateHours("workStart", date)}
                />
                <TimePicker
                  placeholder="End"
                  disabled={!workStart}
                  time={workEnd}
                  onChange={date => updateHours("workEnd", date)}
                />
              </div>
            </div>
            <Divider />
            <div className="break-hours">
              <h3>Breaks</h3>
              <div className="from-to-container">
                <TimePicker
                  placeholder="Start"
                  disabled={!workEnd}
                  minTime={workStart}
                  maxTime={breakMaxTime}
                  time={breakStart}
                  onChange={date => updateBreaks("breakStart", date)}
                />
                <TimePicker
                  placeholder="End"
                  disabled={!(workEnd && breakStart)}
                  minTime={breakStart}
                  maxTime={breakMaxTime}
                  time={breakEnd}
                  onChange={date => updateBreaks("breakEnd", date)}
                />
              </div>
            </div>
            <div className="reset-button-container">
              <Button
                id="reset-button"
                secondary={!savingData}
                size="medium"
                onClick={() => resetDailyData({ workStart, uid })}
                loading={savingData}
              >
                RESET
              </Button>
            </div>
          </Segment>
          <Segment raised size="huge" textAlign="center">
            Total hours:{" "}
            {timeWorked > 0 && (
              <span> {(timeWorked - totalBreaks).toFixed(2)}</span>
            )}
          </Segment>
        </HoursContainer>
        <SaveButton
          onClick={() => saveHoursAndBreaksToFirebase(this.props)}
          savingData={savingData}
        />
      </DailyFormContainer>
    );
  }
}

export default DailyForm;
