import firebase from "../../../firebaseConfig";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_WAGES = "UPDATE_WAGES";
export const UPDATE_WAGES_INPUT = "UPDATE_WAGES_INPUT";

export const STARTING_USER_DELETE = "STARTING_USER_DELETE";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_ERROR = "USER_DELETE_ERROR";

export const TOGGLE_CONFIRMATION_DIALOG = "TOGGLE_CONFIRMATION_DIALOG";

export const SAVING_WAGES = "SAVING_WAGES";
export const SAVING_WAGES_SUCCESS = "SAVING_WAGES_SUCCESS";
export const SAVING_WAGES_ERROR = "SAVING_WAGES_ERROR";

export const fetchUserData = uid => async dispatch => {
  try {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => doc.data());

    dispatch({ type: UPDATE_USER_DATA, user });
  } catch (err) {
    console.log(err);
  }
};

export const updateWages = (wages, uid) => async dispatch => {
  try {
    await firebase
      .database()
      .ref(`users`)
      .child(uid)
      .update({ wages });
    dispatch({ type: UPDATE_WAGES, wages });
  } catch (err) {
    console.log(err);
  }
};

export const updateWagesInput = wages => ({ type: UPDATE_WAGES_INPUT, wages });

export const deleteUser = () => async dispatch => {
  try {
    dispatch({ type: STARTING_USER_DELETE });
    await firebase.auth().currentUser.delete();
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_DELETE_ERROR });
    console.error(error);
  }
};

export const toggleConfirmationDialog = () => ({
  type: TOGGLE_CONFIRMATION_DIALOG
});
