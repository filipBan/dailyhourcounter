import React, { Component } from "react";
import { endOfDay, subMinutes, startOfMinute } from "date-fns";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Button from "../../components/Button";

import styled from "styled-components";

import TopBar from "../TopBar";

import TopControls from "./TopControls";

import { DateTimePicker } from "material-ui-pickers";
import { format } from "date-fns/esm";

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
  max-width: 40rem;
  padding: 0 1rem;
`;

const Section = styled(Card)`
  margin-bottom: 1rem;
  min-height: 5rem;
  padding: 2rem 0;
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;

  button:first-child {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-left: 0.5rem;
  }
`;

// TODO - split this component up, it's too big
class DailyForm extends Component {
  componentDidMount() {
    const { uid, today, fetchDailyData } = this.props;
    if (uid) {
      fetchDailyData({ uid, today });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.today !== prevProps.today) {
      const { uid, today, fetchDailyData } = this.props;
      fetchDailyData({ uid, today });
    }
  }

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
      hours,
      breaks,
      workedMinutes,
      breakMinutes,
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

    const workStart = hours[0].start;
    const workEnd = hours[0].end;
    const breakStart = breaks[0].start;
    const breakEnd = breaks[0].end;

    const breakMaxTime = this.getBreakMaxTime();

    const totalTimeWorked = `${Math.floor(
      (workedMinutes - breakMinutes) / 60
    )}h ${(workedMinutes - breakMinutes) % 60}min total`;

    return (
      <DailyFormContainer>
        <TopBar />
        <HoursContainer>
          <TopControls
            handleCalendarChange={handleCalendarChange}
            today={today}
          />
          <Section>
            <div>
              <SectionTitle>Hours</SectionTitle>
              <ButtonContainer>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.hoursStart)}
                >
                  {workStart ? format(workStart, "HH:mm") : "Start"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.hoursEnd)}
                  disabled={!workStart}
                >
                  {workEnd ? format(workEnd, "HH:mm") : "End"}
                </Button>
                <div style={{ display: "none" }}>
                  <DateTimePicker
                    ampm={false}
                    value={workStart}
                    onChange={date =>
                      updateHours("workStart", startOfMinute(date))
                    }
                    ref={node => {
                      this.hoursStart = node;
                    }}
                  />
                  <DateTimePicker
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
              </ButtonContainer>
            </div>

            <div>
              <SectionTitle>Breaks</SectionTitle>
              <ButtonContainer>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.breakStart)}
                  disabled={!workEnd}
                >
                  {breakStart ? format(breakStart, "HH:mm") : "Start"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.breakEnd)}
                  disabled={!(workEnd && breakStart)}
                >
                  {breakEnd ? format(breakEnd, "HH:mm") : "End"}
                </Button>
                <div style={{ display: "none" }}>
                  <DateTimePicker
                    ampm={false}
                    value={breakStart}
                    onChange={date =>
                      updateBreaks("breakStart", startOfMinute(date))
                    }
                    ref={node => {
                      this.breakStart = node;
                    }}
                  />
                  <DateTimePicker
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
              </ButtonContainer>
            </div>
          </Section>
          {workedMinutes > 0 && (
            <Section>
              <span> {totalTimeWorked}</span>
            </Section>
          )}
        </HoursContainer>
        <ButtonContainer>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => resetDailyData({ today, uid })}
          >
            RESET
          </Button>
          <Button
            onClick={() => saveHoursAndBreaksToFirebase(this.props)}
            disabled={savingData}
            fullWidth
            color="primary"
            variant="contained"
          >
            SAVE
          </Button>
        </ButtonContainer>
      </DailyFormContainer>
    );
  }
}

export default DailyForm;
