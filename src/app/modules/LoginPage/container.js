import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { logInWithEmailAndPassword, updateInput } from "./actions";

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
  )(LoginPage)
);
