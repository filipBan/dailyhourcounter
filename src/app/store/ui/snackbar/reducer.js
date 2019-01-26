import { RESET_SNACKBAR, UPDATES_AVAILABLE } from "./actions";

const initialState = {
  message: "",
  type: ""
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_FAIL":
    case "ERROR_FETCHING_DAY_DATA":
    case "ERROR_SAVING_DAY_DATA":
    case "PASSWORD_RESET_EMAIL_ERROR":
    case "SAVING_WAGES_ERROR":
    case "USER_DELETE_ERROR":
    case "UPDATE_USER_DATA_ERROR":
      return {
        message: action.error,
        type: "error"
      };
    case "VERIFICATION_EMAIL_SENT":
      return {
        message: "Email sent",
        type: "success"
      };
    case "PASSWORD_RESET_EMAIL_SENT":
      return {
        message: `Password reset email sent to ${action.email}`,
        type: "success"
      };
    case "SAVING_WAGES_SUCCESS":
      return {
        message: "New wages saved!",
        type: "success"
      };
    case "CLEAR_AUTH_ERRORS":
    case RESET_SNACKBAR:
      return initialState;
    case UPDATES_AVAILABLE: {
      return {
        type: "updates-available"
      };
    }
    case "AUTH_LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default snackbar;
