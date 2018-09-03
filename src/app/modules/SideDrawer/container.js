import { connect } from "react-redux";
import { toggleDrawer } from "./actions";
import { logoutUser } from "../LoginPage/actions";

import SideDrawer from "./SideDrawer";

const mapStateToProps = state => ({
  visible: state.sideDrawer.visible
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
