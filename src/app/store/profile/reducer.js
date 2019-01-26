import {
  UPDATE_USER_DATA,
  UPDATE_WAGES_INPUT,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  STARTING_USER_DELETE,
  TOGGLE_CONFIRMATION_DIALOG,
  SAVING_WAGES,
  SAVING_WAGES_SUCCESS,
  SAVING_WAGES_ERROR,
  CHANGE_CURRENCY
} from "./actions";

const initialState = {
  name: "",
  email: "",
  wages: 0,
  currency: "",
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
        wages: parseFloat(action.user.wages),
        currency: action.user.currency
      };

    case UPDATE_WAGES_INPUT:
      return {
        ...state,
        wages: parseFloat(action.wages)
      };

    case "SENDING_PASSWORD_RESET_EMAIL":
    case STARTING_USER_DELETE:
    case SAVING_WAGES:
      return {
        ...state,
        loading: true
      };

    case "PASSWORD_RESET_EMAIL_SENT":
    case "PASSWORD_RESET_EMAIL_ERROR":
    case USER_DELETE_SUCCESS:
    case USER_DELETE_ERROR:
    case SAVING_WAGES_SUCCESS:
    case SAVING_WAGES_ERROR:
      return {
        ...state,
        loading: false
      };

    case TOGGLE_CONFIRMATION_DIALOG:
      return {
        ...state,
        dialogOpen: !state.dialogOpen
      };

    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency
      };

    default:
      return state;
  }
};

export default profile;
