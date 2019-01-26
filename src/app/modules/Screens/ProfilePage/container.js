import { connect } from "react-redux";
import ProfilePage from "./Profile";

import { sendResetPasswordEmail } from "../../../store/auth/actions";
import {
  deleteUser,
  toggleConfirmationDialog,
  updateWagesInput
} from "../../../store/profile/actions";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email)),
  deleteUser: () => dispatch(deleteUser()),
  toggleConfirmationDialog: () => dispatch(toggleConfirmationDialog()),
  updateWagesInput: value => dispatch(updateWagesInput(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
