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
      return {
        message: action.error,
        type: "error"
      };

    case "VERIFICATION_EMAIL_SENT":
    case "PASSWORD_RESET_EMAIL_SENT":
      return {
        message: "Email sent",
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
