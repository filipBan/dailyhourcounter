import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import {
  logInWithEmailAndPassword,
  updateInput
} from "../../../store/auth/actions";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  email: state.auth.login.email,
  password: state.auth.login.password,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  logInWithEmailAndPassword: (email, password) =>
    dispatch(logInWithEmailAndPassword(email, password)),
  updateInput: (field, value) => dispatch(updateInput("login", field, value))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
