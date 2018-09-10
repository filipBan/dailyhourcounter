import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReportScreen from "./SettingsScreen";
import { updateWages, updateWagesInput } from "./actions";

//TODO - likely better to just pass isLoggedIn instead of the whole auth state
// same applies to most screen components
const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  updateWages: (wages, uid) => dispatch(updateWages(wages, uid)),
  updateWagesInput: data => dispatch(updateWagesInput(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReportScreen)
);
