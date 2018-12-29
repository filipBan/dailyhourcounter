import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { toggleDrawer } from "./actions";
import { logoutUser } from "../LoginPage/actions";

import SideDrawer from "./SideDrawer";

const mapStateToProps = state => ({
  visible: state.sideDrawer.visible
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: value => dispatch(toggleDrawer(value)),
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideDrawer)
);
