import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_END,
  UPDATE_INPUT,
  UPDATE_USER_DATA,
  REGISTRATION_COMPLETE
} from "./actions";
import { REPLACE_DAY_DATA } from "../today/actions";
import { UPDATE_WAGES } from "../settings/actions";

const initialState = {
  isLoggedIn: false,
  name: "",
  uid: "",
  wages: 0,
  loading: false,
  emailVerified: false,
  checkingAuthState: true,
  login: {
    email: "",
    password: ""
  },
  register: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true };
    case AUTH_END:
    case REGISTRATION_COMPLETE:
      return {
        ...initialState,
        checkingAuthState: false
      };
    case AUTH_SUCCESS:
      const user = {
        isLoggedIn: true,
        emailVerified: action.payload.emailVerified,
        email: action.payload.email,
        uid: action.payload.uid,
        loading: false,
        checkingAuthState: false
      };
      return { ...state, ...user };
    case AUTH_FAIL:
      return { ...state, loading: false };
    case AUTH_LOGOUT:
      return {
        ...initialState,
        checkingAuthState: false
      };

    case UPDATE_INPUT:
      return {
        ...state,
        [action.payload.screen]: {
          ...state[action.payload.screen],
          [action.payload.field]: action.payload.value
        }
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        name: action.user.userName,
        wages: action.user.wages
      };
    case REPLACE_DAY_DATA:
      return {
        ...state,
        wages: action.payload.wages || state.wages
      };
    case UPDATE_WAGES:
      return {
        ...state,
        wages: action.wages
      };
    default:
      return state;
  }
};

export default auth;
