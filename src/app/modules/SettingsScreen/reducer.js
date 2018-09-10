import { UPDATE_WAGES_INPUT } from "./actions";
import { UPDATE_USER_DATA } from "../LoginPage/actions";

const initialState = {
  wages: ""
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WAGES_INPUT:
      return {
        ...state,
        wages: action.wages
      };

    case UPDATE_USER_DATA:
      console.log(action);
      return {
        ...state,
        wages: action.user.wages
      };
    default:
      return state;
  }
};

export default settings;
