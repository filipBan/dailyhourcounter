import { connect } from "react-redux";
import { saveLoggedUserSession } from "../../modules/LoginPage/actions";
import App from "./App";

import { toggleDrawer } from "../SideDrawer/actions";
import { handleCalendarChange, toggleCalendar } from "../DailyForm/actions";

const mapStateToProps = state => ({
  auth: state.auth,
  ...state.today
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUserSession: user => dispatch(saveLoggedUserSession(user)),
  toggleDrawer: () => dispatch(toggleDrawer()),
  handleCalendarChange: date => dispatch(handleCalendarChange(date)),
  toggleCalendar: () => dispatch(toggleCalendar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
