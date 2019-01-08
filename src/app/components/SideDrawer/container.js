import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { toggleDrawer } from "../../store/ui/sideDrawer/actions";
import { logoutUser } from "../../store/auth/actions";

import SideDrawer from "./SideDrawer";

const mapStateToProps = state => ({
  visible: state.ui.sideDrawer.visible
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
