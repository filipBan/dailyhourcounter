import { UPDATE_WAGES_INPUT } from "./actions";
import { UPDATE_USER_DATA } from "../auth/actions";

const initialState = {
  wages: 0
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WAGES_INPUT:
      return {
        ...state,
        wages: parseFloat(action.wages)
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        wages: parseFloat(action.user.wages)
      };
    case "AUTH_LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default settings;
