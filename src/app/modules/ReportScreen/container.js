import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReportScreen from "./ReportScreen";

import {
  changeReportStartDay,
  changeReportEndDay,
  fetchDateRangeData
} from "./actions";

const mapStateToProps = state => ({
  auth: state.auth,
  reports: state.reports
});

const mapDispatchToProps = dispatch => ({
  changeReportStartDay: date => dispatch(changeReportStartDay(date)),
  changeReportEndDay: date => dispatch(changeReportEndDay(date)),
  fetchDateRangeData: (start, end, uid) =>
    dispatch(fetchDateRangeData(start, end, uid))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReportScreen)
);
