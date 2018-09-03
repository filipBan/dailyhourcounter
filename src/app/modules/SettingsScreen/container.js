import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReportScreen from "./SettingsScreen";

//TODO - likely better to just pass isLoggedIn instead of the whole auth state
// same applies to most screen components
const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(ReportScreen));
