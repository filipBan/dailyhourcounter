import { UPDATE_USER_DATA } from "./actions";

const initialState = {
  name: "",
  email: "",
  wages: 0,
  loading: false
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
      return {
        ...state,
        loading: true
      };

    case "PASSWORD_RESET_EMAIL_SENT":
    case "PASSWORD_RESET_EMAIL_ERROR":
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default profile;
