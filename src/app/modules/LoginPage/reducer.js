import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_END,
  UPDATE_INPUT,
  UPDATE_USER_DATA
} from "./actions";
import { REPLACE_DAY_DATA } from "../DailyForm/actions";
import { UPDATE_WAGES } from "../SettingsScreen/actions";

const initialState = {
  isLoggedIn: false,
  name: "",
  uid: "",
  wages: 0,
  loading: false,
  error: null,
  email: "",
  password: "",
  emailVerified: false,
  checkingAuthState: true
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true };
    case AUTH_END:
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
      return { ...state, loading: false, error: action.payload };
    case AUTH_LOGOUT:
      return initialState;
    case UPDATE_INPUT:
      return {
        ...state,
        [action.payload.field]: action.payload.value
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
