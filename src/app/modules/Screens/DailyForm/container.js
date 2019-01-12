import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DailyForm from "./DailyForm";
import {
  saveHoursAndBreaksToFirebase,
  updateBreaks,
  updateHours,
  fetchDailyData,
  resetDailyData,
  handleCalendarChange,
  clearTodayErrors
} from "../../../store/today/actions";

const mapStateToProps = state => ({
  ...state.today,
  wages: state.auth.wages,
  uid: state.auth.uid,
  auth: state.auth,
  notificationOpen: state.ui.notification.modalOpen
});

const mapDispatchToProps = dispatch => ({
  updateBreaks: (timeType, amount) => dispatch(updateBreaks(timeType, amount)),
  updateHours: (timeType, amount) => dispatch(updateHours(timeType, amount)),
  saveHoursAndBreaksToFirebase: dayData =>
    dispatch(saveHoursAndBreaksToFirebase(dayData)),
  fetchDailyData: props => dispatch(fetchDailyData(props)),
  resetDailyData: props => dispatch(resetDailyData(props)),
  handleCalendarChange: date => dispatch(handleCalendarChange(date)),
  clearTodayErrors: () => dispatch(clearTodayErrors())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DailyForm)
);
