import { combineReducers } from "redux";

import sideDrawer from "./sideDrawer/reducer";
import notification from "./notifications/reducer";
import snackbar from "./snackbar/reducer";
import install from "./install/reducer";

export default combineReducers({
  sideDrawer,
  notification,
  snackbar,
  install
});
