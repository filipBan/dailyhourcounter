import { combineReducers } from "redux";

import sideDrawer from "./sideDrawer/reducer";
import notification from "./notifications/reducers";

export default combineReducers({
  sideDrawer,
  notification
});
