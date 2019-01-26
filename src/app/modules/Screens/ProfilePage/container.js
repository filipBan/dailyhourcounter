import { connect } from "react-redux";
import ProfilePage from "./Profile";

import { sendResetPasswordEmail } from "../../../store/auth/actions";
import {
  deleteUser,
  toggleConfirmationDialog,
  updateWagesInput,
  saveWagesInDatabase
} from "../../../store/profile/actions";

const mapStateToProps = state => ({
  ...state.profile,
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: email => dispatch(sendResetPasswordEmail(email)),
  deleteUser: () => dispatch(deleteUser()),
  toggleConfirmationDialog: () => dispatch(toggleConfirmationDialog()),
  updateWagesInput: value => dispatch(updateWagesInput(value)),
  saveWagesInDatabase: (wages, uid) => dispatch(saveWagesInDatabase(wages, uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
