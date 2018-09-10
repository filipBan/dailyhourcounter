import React, { Component } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";

import { Button, Segment, Divider } from "semantic-ui-react";

import TimePicker from "../../components/TimePicker";
import SaveButton from "../../components/SaveButton";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

// TODO - split this component up, it's too big
class DailyForm extends Component {
  state = {
    isOpen: false
  };

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
    const { workStart, workEnd } = this.props;
    let newTime = workEnd;
    return workStart < workEnd
      ? newTime
      : moment()
          .endOf("day")
          .subtract(59, "minutes");
  };

  changeCalendarDate = date => {
    const { toggleCalendar, handleCalendarChange } = this.props;
    handleCalendarChange(date);
    toggleCalendar();
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
      <div className="daily-form">
        <div className="hours-container">
          <Segment className="today-date" raised size="big" textAlign="center">
            <Button
              basic
              color="blue"
              icon="angle left"
              onClick={() =>
                handleCalendarChange(today.clone().subtract(1, "day"))
              }
            />
            {today.format("ddd Do MMMM YYYY").toString()}
            <Button
              basic
              color="blue"
              icon="angle right"
              onClick={() => handleCalendarChange(today.clone().add(1, "day"))}
            />
          </Segment>
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
        </div>
        <SaveButton
          onClick={() => saveHoursAndBreaksToFirebase(this.props)}
          savingData={savingData}
        />
      </div>
    );
  }
}

export default DailyForm;
