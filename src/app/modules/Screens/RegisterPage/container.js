import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";

import {
  registerNewAccount,
  updateInput,
  authError
} from "../../../store/auth/actions";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loading: state.auth.loading,
  error: state.auth.error,
  email: state.auth.register.email,
  password: state.auth.register.password,
  confirmPassword: state.auth.register.confirmPassword,
  userName: state.auth.register.userName,
  wages: state.auth.register.wages
});

const mapDispatchToProps = dispatch => ({
  registerNewAccount: props => dispatch(registerNewAccount(props)),
  updateInput: (field, value) =>
    dispatch(updateInput("register", field, value)),
  authError: error => dispatch(authError(error))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage)
);
