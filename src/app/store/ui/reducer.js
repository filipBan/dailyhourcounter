import { combineReducers } from "redux";

import sideDrawer from "./sideDrawer/reducer";
import notification from "./notifications/reducer";
import snackbar from "./snackbar/reducer";

export default combineReducers({
  sideDrawer,
  notification,
  snackbar
});
