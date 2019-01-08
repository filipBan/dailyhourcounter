import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DailyForm from "./DailyForm";
import {
  saveHoursAndBreaksToFirebase,
  updateBreaks,
  updateHours,
  fetchDailyData,
  resetDailyData,
  handleCalendarChange
} from "../../store/today/actions";

const mapStateToProps = state => ({
  ...state.today,
  wages: state.auth.wages,
  uid: state.auth.uid,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  updateBreaks: (timeType, amount) => dispatch(updateBreaks(timeType, amount)),
  updateHours: (timeType, amount) => dispatch(updateHours(timeType, amount)),
  saveHoursAndBreaksToFirebase: dayData =>
    dispatch(saveHoursAndBreaksToFirebase(dayData)),
  fetchDailyData: props => dispatch(fetchDailyData(props)),
  resetDailyData: props => dispatch(resetDailyData(props)),
  handleCalendarChange: date => dispatch(handleCalendarChange(date))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DailyForm)
);
