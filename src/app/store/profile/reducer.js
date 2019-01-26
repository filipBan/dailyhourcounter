import {
  UPDATE_USER_DATA,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  STARTING_USER_DELETE,
  TOGGLE_CONFIRMATION_DIALOG
} from "./actions";

const initialState = {
  name: "",
  email: "",
  wages: 0,
  loading: false,
  dialogOpen: false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        email: action.payload.email
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        name: action.user.userName,
        wages: parseFloat(action.user.wages)
      };

    case "SENDING_PASSWORD_RESET_EMAIL":
    case STARTING_USER_DELETE:
      return {
        ...state,
        loading: true
      };

    case "PASSWORD_RESET_EMAIL_SENT":
    case "PASSWORD_RESET_EMAIL_ERROR":
    case USER_DELETE_SUCCESS:
    case USER_DELETE_ERROR:
      return {
        ...state,
        loading: false
      };

    case TOGGLE_CONFIRMATION_DIALOG:
      return {
        ...state,
        dialogOpen: !state.dialogOpen
      };

    default:
      return state;
  }
};

export default profile;
