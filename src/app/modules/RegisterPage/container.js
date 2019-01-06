import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import { logInWithEmailAndPassword, updateInput } from "../LoginPage/actions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logInWithEmailAndPassword: (email, password) =>
    dispatch(logInWithEmailAndPassword(email, password)),
  updateInput: (field, value) => dispatch(updateInput(field, value))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage)
);
