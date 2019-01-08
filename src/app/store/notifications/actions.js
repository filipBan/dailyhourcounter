import firebase from "../../../firebaseConfig";

export const SAVE_UNREAD_NOTIFICATIONS = "SAVE_UNREAD_NOTIFICATIONS";

export const checkNotifications = uid => async dispatch => {
  try {
    const notifications = await firebase
      .firestore()
      .collection("notifications")
      .doc(uid)
      .collection("notices")
      .where("read", "==", false)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(item => data.push(item.data()));
        return data;
      });
    if (notifications.length) {
      dispatch({ type: SAVE_UNREAD_NOTIFICATIONS, notifications });
    }
  } catch (error) {
    console.error(error);
  }
};
