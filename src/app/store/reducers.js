import { combineReducers } from "redux";

import today from "../modules/DailyForm/reducer";
import auth from "../modules/LoginPage/reducer";
import sideDrawer from "../modules/SideDrawer/reducer";
import reports from "../modules/ReportScreen/reducer";
import settings from "../modules/ReportScreen/reducer";

export default combineReducers({
  today,
  auth,
  sideDrawer,
  reports,
  settings
});
