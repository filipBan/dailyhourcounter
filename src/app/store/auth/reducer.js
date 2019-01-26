import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_END,
  UPDATE_INPUT,
  REGISTRATION_COMPLETE,
  SENDING_VERIFICATION_EMAIL,
  VERIFICATION_EMAIL_SENT,
  VERIFICATION_EMAIL_ERROR,
  SENDING_PASSWORD_RESET_EMAIL,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_ERROR
} from "./actions";

const initialState = {
  isLoggedIn: false,
  uid: "",
  loading: false,
  emailVerified: false,
  checkingAuthState: true,
  login: {
    email: "",
    password: ""
  },
  register: {},
  resetEmail: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
    case SENDING_PASSWORD_RESET_EMAIL:
    case SENDING_VERIFICATION_EMAIL:
      return { ...state, loading: true };
    case AUTH_END:
    case AUTH_LOGOUT:
    case REGISTRATION_COMPLETE:
      return {
        ...initialState,
        checkingAuthState: false
      };
    case AUTH_SUCCESS:
      const user = {
        isLoggedIn: true,
        emailVerified: action.payload.emailVerified,
        uid: action.payload.uid,
        loading: false,
        checkingAuthState: false
      };
      return {
        ...state,
        ...user,
        login: initialState.login,
        register: initialState.register
      };
    case AUTH_FAIL:
      return { ...state, loading: false };

    case UPDATE_INPUT:
      return {
        ...state,
        [action.payload.screen]: {
          ...state[action.payload.screen],
          [action.payload.field]: action.payload.value
        }
      };
    case VERIFICATION_EMAIL_SENT:
    case VERIFICATION_EMAIL_ERROR:
    case PASSWORD_RESET_EMAIL_SENT:
    case PASSWORD_RESET_EMAIL_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default auth;
