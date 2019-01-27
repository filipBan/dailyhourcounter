import React, { Component } from "react";
import PropTypes from "prop-types";

import { startOfMinute, addDays, format } from "date-fns";
import { DateTimePicker } from "material-ui-pickers";

import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";

import Button from "../../../components/Button";
import TopBar from "../../../components/TopBar";

import TopControls from "./TopControls";

const SideDrawer = React.lazy(() => import("../../../components/SideDrawer"));
const Notification = React.lazy(() => import("../../Notification"));

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
  justify-content: center;

  div:first-child {
    margin-right: 0.5rem;
  }

  div:nth-child(2) {
    margin-left: 0.5rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 1rem;
`;

// TODO - split this component up, it's too big
// TODO -- add a section to show wages for that day only (changable)
class DailyForm extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    today: PropTypes.instanceOf(Date).isRequired,
    fetchDailyData: PropTypes.func.isRequired,
    hours: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date)
      })
    ),
    breaks: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date)
      })
    ),
    workedMinutes: PropTypes.number.isRequired,
    breakMinutes: PropTypes.number.isRequired,
    updateBreaks: PropTypes.func.isRequired,
    updateHours: PropTypes.func.isRequired,
    saveHoursAndBreaksToFirebase: PropTypes.func.isRequired,
    savingData: PropTypes.bool.isRequired,
    loadingData: PropTypes.bool.isRequired,
    today: PropTypes.instanceOf(Date).isRequired,
    handleCalendarChange: PropTypes.func.isRequired,
    resetDailyData: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    wages: PropTypes.number
  };

  static defaultProps = {
    hours: {
      start: null,
      end: null
    },
    breaks: {
      start: null,
      end: null
    },
    wages: null
  };

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
      saveHoursAndBreaksToFirebase,
      savingData,
      loadingData,
      today,
      handleCalendarChange,
      resetDailyData,
      uid,
      wages
    } = this.props;

    const workStart = hours[0].start;
    const workEnd = hours[0].end;
    const breakStart = breaks[0].start;
    const breakEnd = breaks[0].end;
    const processing = savingData || loadingData;

    const totalTimeWorked = `${Math.floor(
      (workedMinutes - breakMinutes) / 60
    )}h ${(workedMinutes - breakMinutes) % 60}min`;

    return (
      <DailyFormContainer>
        <SideDrawer />

        <TopBar title="Save hours" showCalendar />
        <Progress>
          {(savingData || loadingData) && (
            <LinearProgress aria-label="loading-progress" />
          )}
        </Progress>
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
                  deleteBadge={Boolean(workStart)}
                  onDelete={() => updateHours("workStart", null)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.hoursStart)}
                  disabled={processing}
                  aria-label="work-start"
                >
                  {workStart ? format(workStart, "HH:mm") : "Start"}
                </Button>
                <Button
                  deleteBadge={Boolean(workEnd)}
                  onDelete={() => updateHours("workEnd", null)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.hoursEnd)}
                  disabled={!workStart || processing}
                  aria-label="work-end"
                >
                  {workEnd ? format(workEnd, "HH:mm") : "End"}
                </Button>
                <div style={{ display: "none" }}>
                  <DateTimePicker
                    aria-label="work-start-picker"
                    initialFocusedDate={today}
                    minDate={today}
                    maxDate={today}
                    openTo="hours"
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
                    initialFocusedDate={today}
                    minDate={today}
                    maxDate={addDays(today, 1)}
                    openTo="hours"
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
                  deleteBadge={Boolean(breakStart)}
                  onDelete={() => updateBreaks("breakStart", null)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.breakStart)}
                  disabled={!(workStart && workEnd) || processing}
                  aria-label="break-start"
                >
                  {breakStart ? format(breakStart, "HH:mm") : "Start"}
                </Button>
                <Button
                  deleteBadge={Boolean(breakEnd)}
                  onDelete={() => updateBreaks("breakEnd", null)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={e => this.openPicker(e, this.breakEnd)}
                  disabled={!(workStart && workEnd && breakStart) || processing}
                  aria-label="break-end"
                >
                  {breakEnd ? format(breakEnd, "HH:mm") : "End"}
                </Button>
                <div style={{ display: "none" }}>
                  <DateTimePicker
                    initialFocusedDate={today}
                    minDate={today}
                    maxDate={workEnd}
                    openTo="hours"
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
                    initialFocusedDate={today}
                    minDate={today}
                    maxDate={workEnd}
                    openTo="hours"
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
          <Section aria-label="total-time-display">
            {workedMinutes - breakMinutes > 0 ? (
              <span>{totalTimeWorked}</span>
            ) : (
              <span>No records</span>
            )}
          </Section>
        </HoursContainer>
        <ButtonContainer>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => resetDailyData({ today, uid })}
            disabled={savingData || loadingData}
            aria-label="reset-button"
          >
            RESET
          </Button>
          {/* TODO -- DON'T PASS ALL THIS.PROPS to the savefunction stupid */}
          <Button
            onClick={() => saveHoursAndBreaksToFirebase(this.props)}
            fullWidth
            color="primary"
            variant="contained"
            disabled={savingData || loadingData}
            aria-label="day-form-save"
          >
            SAVE
          </Button>
        </ButtonContainer>
        <Notification />
      </DailyFormContainer>
    );
  }
}

export default DailyForm;
