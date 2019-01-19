import { combineReducers } from "redux";

import sideDrawer from "./sideDrawer/reducer";
import notification from "./notifications/reducers";
import snackbar from "./snackbar/reducer";

export default combineReducers({
  sideDrawer,
  notification,
  snackbar
});
