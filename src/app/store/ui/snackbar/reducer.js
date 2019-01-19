import { RESET_SNACKBAR } from "./actions";

const initialState = {
  message: "",
  type: ""
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case "ERROR_SAVING_DAY_DATA":
      return {
        message: action.error,
        type: "error"
      };

    case "AUTH_FAIL":
      return {
        message: action.error,
        type: "error"
      };

    case "ERROR_FETCHING_DAY_DATA":
      return {
        message: action.error,
        type: "error"
      };

    case "CLEAR_AUTH_ERRORS":
      return initialState;

    case RESET_SNACKBAR:
      return initialState;
    default:
      return state;
  }
};
export default snackbar;
