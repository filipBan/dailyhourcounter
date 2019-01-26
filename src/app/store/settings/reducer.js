import { UPDATE_WAGES_INPUT } from "./actions";

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
    case "AUTH_LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default settings;
