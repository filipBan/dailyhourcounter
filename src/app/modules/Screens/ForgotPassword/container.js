import { connect } from "react-redux";
import ForgotPasswords from "./ForgotPassword";

import { sendResetPasswordEmail } from "../../../store/auth/actions";

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswords);
