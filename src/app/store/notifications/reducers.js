import { SAVE_UNREAD_NOTIFICATIONS } from "./actions";

export const notifications = (state = [], action) => {
  switch (action.type) {
    case SAVE_UNREAD_NOTIFICATIONS:
      return [...state, ...action.notifications];
    default:
      return state;
  }
};

export default notifications;
