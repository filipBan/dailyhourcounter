import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import { Button } from "semantic-ui-react";

import "./style.css";

//TODO - change to redux controlled isOpen and remove internal state
class TimePicker extends Component {
  state = {
    isOpen: false
  };

  toggleCalendar = e => {
    const { disabled } = this.props;
    e && e.preventDefault();
    if (!disabled) {
      this.setState(({ isOpen }) => ({ isOpen: !this.state.isOpen }));
    }
  };

  handleChange = date => {
    this.props.onChange(date);
    this.toggleCalendar();
  };

  render() {
    const { time, placeholder, minTime, maxTime, disabled, today } = this.props;
    const todayFormat = today.format("YYYY-MM-DD");

    return (
      <div className="from-to">
        <Button
          size="big"
          basic
          color="blue"
          className="custom-input"
          disabled={disabled}
          onClick={this.toggleCalendar}
        >
          {time ? time.format("HH:mm") : placeholder}
        </Button>
        {this.state.isOpen && (
          <DatePicker
            className="date-picker-style"
            calendarClassName="time-picker-style"
            selected={time}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="LT"
            timeFormat="HH:mm"
            withPortal
            inline
            placeholderText={placeholder}
            minTime={minTime || null}
            maxTime={maxTime || null}
            disabled={disabled}
            openToDate={moment(todayFormat)}
          />
        )}
      </div>
    );
  }
}

export default TimePicker;
