import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  UPDATE_INPUT,
  UPDATE_USER_DATA
} from "./actions";
import { REPLACE_DAY_DATA } from "../DailyForm/actions";

const initialState = {
  isLoggedIn: false,
  name: "",
  uid: "",
  wages: 0,
  loading: false,
  error: undefined,
  email: "",
  password: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      const user = {
        isLoggedIn: true,
        email: action.payload.email,
        uid: action.payload.uid,
        loading: false
      };
      return user;
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
        wages: action.payload.wages
      };
    default:
      return state;
  }
};

export default auth;
