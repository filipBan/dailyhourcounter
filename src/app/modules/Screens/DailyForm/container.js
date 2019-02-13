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
} from "../../../store/today/actions";

import { toggleInstallPrompt } from "../../../store/ui/install/actions";

const mapStateToProps = state => ({
  ...state.today,
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  toggleInstallPrompt: () => dispatch(toggleInstallPrompt()),
  updateBreaks: (timeType, amount) =>
    dispatch(updateBreaks(timeType, amount)),
  updateHours: (timeType, amount) =>
    dispatch(updateHours(timeType, amount)),
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
