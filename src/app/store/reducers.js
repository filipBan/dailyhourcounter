import { combineReducers } from "redux";

import today from "./today/reducer";
import auth from "./auth/reducer";
import ui from "./ui/reducer";
import reports from "./reports/reducer";
import settings from "./settings/reducer";
import notifications from "./notifications/reducers";

export default combineReducers({
  today,
  auth,
  ui,
  reports,
  settings,
  notifications
});
