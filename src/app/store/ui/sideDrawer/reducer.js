import { TOGGLE_DRAWER } from "./actions";

const initialState = {
  visible: false
};

const sideDrawer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        visible: action.value
      };

    case "AUTH_LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export default sideDrawer;
