import { connect } from "react-redux";
import VerifyPage from "./VerifyPage";

import { logoutUser, sendEmailVerification } from "../../../store/auth/actions";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  emailVerified: state.auth.emailVerified,
  checkingAuthState: state.auth.checkingAuthState,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  sendEmailVerification: () => dispatch(sendEmailVerification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPage);
