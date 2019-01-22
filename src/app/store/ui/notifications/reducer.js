import { CLOSE_NOTIFICATIONS_MODAL, SAVE_UNREAD_NOTIFICATION } from "./actions";

const initialState = {
  notification: {},
  modalOpen: false
};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_UNREAD_NOTIFICATION:
      return { modalOpen: true, notification: action.notification };
    case "AUTH_LOGOUT":
    case CLOSE_NOTIFICATIONS_MODAL:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default notification;
