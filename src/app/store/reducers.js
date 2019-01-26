import { combineReducers } from "redux";

import today from "./today/reducer";
import auth from "./auth/reducer";
import ui from "./ui/reducer";
import reports from "./reports/reducer";
import profile from "./profile/reducer";

export default combineReducers({
  today,
  auth,
  ui,
  reports,
  profile
});
