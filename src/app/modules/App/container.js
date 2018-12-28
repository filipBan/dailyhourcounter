import { connect } from "react-redux";
import { saveLoggedUserSession } from "../../modules/LoginPage/actions";
import App from "./App";

const mapStateToProps = state => ({
  auth: state.auth,
  ...state.today
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUserSession: user => dispatch(saveLoggedUserSession(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
