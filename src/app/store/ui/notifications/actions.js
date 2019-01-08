import firebase from "../../../../firebaseConfig";

export const SAVE_UNREAD_NOTIFICATION = "SAVE_UNREAD_NOTIFICATION";
export const CLOSE_NOTIFICATIONS_MODAL = "CLOSE_NOTIFICATIONS_MODAL";

export const checkNotifications = uid => async dispatch => {
  try {
    const notification = await firebase
      .firestore()
      .collection("notifications")
      .doc(uid)
      .collection("notices")
      .where("read", "==", false)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(item => data.push({ id: item.id, ...item.data() }));
        return data.length ? data[0] : null;
      });

    if (notification) {
      dispatch({ type: SAVE_UNREAD_NOTIFICATION, notification });
    }
  } catch (error) {
    console.error(error);
  }
};

export const closeNotificationModal = (userId, noticeId) => async dispatch => {
  try {
    dispatch({ type: CLOSE_NOTIFICATIONS_MODAL });

    await firebase
      .firestore()
      .collection("notifications")
      .doc(userId)
      .collection("notices")
      .doc(noticeId)
      .update({
        read: true
      });
  } catch (error) {
    console.error(error);
  }
};
