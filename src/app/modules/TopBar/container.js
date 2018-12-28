import { connect } from "react-redux";
import TopBar from "./TopBar";

import { toggleDrawer } from "../SideDrawer/actions";
import { handleCalendarChange, toggleCalendar } from "../DailyForm/actions";

const mapStateToProps = state => ({
  calendarVisible: state.today.calendarVisible,
  today: state.today.today
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  toggleCalendar: () => dispatch(toggleCalendar()),
  handleCalendarChange: date => dispatch(handleCalendarChange(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
