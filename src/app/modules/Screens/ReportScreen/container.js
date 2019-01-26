import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReportScreen from "./ReportScreen";

import {
  changeReportStartDay,
  changeReportEndDay,
  clearReportData,
  fetchDateRangeData
} from "../../../store/reports/actions";

const mapStateToProps = state => ({
  uid: state.auth.uid,
  reports: state.reports,
  currency: state.profile.currency
});

const mapDispatchToProps = dispatch => ({
  changeReportStartDay: date => dispatch(changeReportStartDay(date)),
  changeReportEndDay: date => dispatch(changeReportEndDay(date)),
  fetchDateRangeData: (start, end, uid) =>
    dispatch(fetchDateRangeData(start, end, uid)),
  clearReportData: () => dispatch(clearReportData())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReportScreen)
);
