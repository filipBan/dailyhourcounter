import { connect } from "react-redux";
import {
  saveLoggedUserSession,
  logoutUser
} from "../../modules/LoginPage/actions";
import App from "./App";

const mapStateToProps = state => ({
  auth: state.auth,
  ...state.today
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUserSession: user => dispatch(saveLoggedUserSession(user)),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
