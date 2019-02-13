import { connect } from "react-redux";
import App from "./App";

import { saveLoggedUserSession } from "../../store/auth/actions";
import { notifyAboutUpdates } from "../../store/ui/snackbar/actions";
import { checkNotifications } from "../../store/ui/notifications/actions";
import { toggleInstallPrompt } from "../../store/ui/installPrompt/actions";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  emailVerified: state.auth.emailVerified,
  checkingAuthState: state.auth.checkingAuthState
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUserSession: user => dispatch(saveLoggedUserSession(user)),
  checkNotifications: uid => dispatch(checkNotifications(uid)),
  notifyAboutUpdates: () => dispatch(notifyAboutUpdates()),
  toggleInstallPrompt: () => dispatch(toggleInstallPrompt())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
