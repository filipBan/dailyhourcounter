import { UPDATE_WAGES_INPUT } from "./actions";

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

    default:
      return state;
  }
};

export default settings;
