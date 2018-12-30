import React, { Component } from "react";
import { endOfDay, subMinutes, startOfMinute } from "date-fns";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Button from "../../components/Button";

import styled from "styled-components";

import TopBar from "../TopBar";

import TopControls from "./TopControls";

import { TimePicker } from "material-ui-pickers";

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

const Section = styled(Card)`
  margin-bottom: 1rem;
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

  handleDateChange = date => {
    console.log(startOfMinute(date));
    this.setState({ selectedDate: date });
  };

  openPicker = (e, node) => {
    node.open(e);
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
          <Section className="hours-segment">
            <div className="work-hours">
              <h4>Hours</h4>
              <div className="from-to-container">
                <Button
                  variant="outlined"
                  onClick={e => this.openPicker(e, this.hoursStart)}
                >
                  Start
                </Button>
                <Button
                  variant="outlined"
                  onClick={e => this.openPicker(e, this.hoursEnd)}
                  disabled={!workStart}
                >
                  End
                </Button>
                <div style={{ display: "none" }}>
                  <TimePicker
                    clearable
                    ampm={false}
                    value={workStart}
                    onChange={date =>
                      updateHours("workStart", startOfMinute(date))
                    }
                    ref={node => {
                      this.hoursStart = node;
                    }}
                  />
                  <TimePicker
                    clearable
                    ampm={false}
                    value={workEnd}
                    onChange={date =>
                      updateHours("workEnd", startOfMinute(date))
                    }
                    ref={node => {
                      this.hoursEnd = node;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="break-hours">
              <h3>Breaks</h3>
              <div className="from-to-container">
                <Button
                  variant="outlined"
                  onClick={e => this.openPicker(e, this.breakStart)}
                  disabled={!workEnd}
                >
                  Start
                </Button>
                <Button
                  variant="outlined"
                  onClick={e => this.openPicker(e, this.breakEnd)}
                  disabled={!(workEnd && breakStart)}
                >
                  End
                </Button>
                <div style={{ display: "none" }}>
                  <TimePicker
                    clearable
                    ampm={false}
                    value={breakStart}
                    onChange={date =>
                      updateBreaks("breakStart", startOfMinute(date))
                    }
                    ref={node => {
                      this.breakStart = node;
                    }}
                  />
                  <TimePicker
                    clearable
                    ampm={false}
                    value={breakEnd}
                    onChange={date =>
                      updateBreaks("breakEnd", startOfMinute(date))
                    }
                    ref={node => {
                      this.breakEnd = node;
                    }}
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section>
            Total hours:{" "}
            {timeWorked > 0 && (
              <span> {(timeWorked - totalBreaks).toFixed(2)}</span>
            )}
          </Section>
        </HoursContainer>
        <Button
          variant="outlined"
          onClick={() => resetDailyData({ workStart, uid })}
          loading={savingData}
        >
          RESET
        </Button>
        <Button
          onClick={() => saveHoursAndBreaksToFirebase(this.props)}
          disabled={savingData}
          variant="outlined"
        >
          SAVE
        </Button>
      </DailyFormContainer>
    );
  }
}

export default DailyForm;
