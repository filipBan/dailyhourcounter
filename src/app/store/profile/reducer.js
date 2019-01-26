import { UPDATE_USER_DATA } from "./actions";

const initialState = {
  name: "",
  email: "",
  wages: 0
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
    default:
      return state;
  }
};

export default profile;
