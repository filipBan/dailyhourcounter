import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReportScreen from "./ReportScreen";

import { changeStartDay, changeEndDay } from "./actions";

const mapStateToProps = state => ({
  auth: state.auth,
  reports: state.reports
});

const mapDispatchToProps = dispatch => ({
  changeStartDay: date => dispatch(changeStartDay(date)),
  changeEndDay: date => dispatch(changeEndDay(date))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReportScreen)
);
