import { connect } from "react-redux";
import App from "./App";

import { saveLoggedUserSession, logoutUser } from "../../store/auth/actions";
import { checkNotifications } from "../../store/ui/notifications/actions";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  emailVerified: state.auth.emailVerified,
  checkingAuthState: state.auth.checkingAuthState
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUserSession: user => dispatch(saveLoggedUserSession(user)),
  logoutUser: () => dispatch(logoutUser()),
  checkNotifications: uid => dispatch(checkNotifications(uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
