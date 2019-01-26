import { connect } from "react-redux";
import ProfilePage from "./Profile";

import { sendResetPasswordEmail } from "../../../store/auth/actions";
import {
  deleteUser,
  toggleConfirmationDialog,
  updateWagesInput,
  saveWagesInDatabase,
  changeCurrency
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
  saveWagesInDatabase: (wages, currency, uid) =>
    dispatch(saveWagesInDatabase(wages, currency, uid)),
  changeCurrency: currency => dispatch(changeCurrency(currency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
