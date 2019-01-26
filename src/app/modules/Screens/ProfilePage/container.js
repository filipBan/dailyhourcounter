import { connect } from "react-redux";
import ProfilePage from "./Profile";

import { sendResetPasswordEmail } from "../../../store/auth/actions";
import {
  deleteUser,
  toggleConfirmationDialog
} from "../../../store/profile/actions";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email)),
  deleteUser: () => dispatch(deleteUser()),
  toggleConfirmationDialog: () => dispatch(toggleConfirmationDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
