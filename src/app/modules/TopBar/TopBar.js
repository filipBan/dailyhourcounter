import React from "react";
import DatePicker from "react-datepicker";
import { Icon } from "semantic-ui-react";
import "./style.css";

const TopBar = ({
  calendarVisible,
  toggleDrawer,
  toggleCalendar,
  handleCalendarChange
}) => {
  const changeCalendarDate = date => {
    handleCalendarChange(date);
    toggleCalendar();
  };

  return (
    <div className="top-bar">
      <div className="top-bar-icon">
        <Icon name="bars" size="big" onClick={toggleDrawer} />
      </div>
      <div className="top-bar-icon">
        <Icon
          name="calendar alternate outline"
          size="big"
          onClick={() => toggleCalendar()}
        />
        {calendarVisible && (
          <DatePicker
            calendarClassName="main-calendar"
            withPortal
            inline
            onChange={changeCalendarDate}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
