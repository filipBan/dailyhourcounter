import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";

import { registerNewAccount } from "../../store/auth/actions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  registerNewAccount: props => dispatch(registerNewAccount(props))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage)
);
