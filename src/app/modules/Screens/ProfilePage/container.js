import { connect } from "react-redux";
import ProfilePage from "./Profile";

import { sendResetPasswordEmail } from "../../../store/auth/actions";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
