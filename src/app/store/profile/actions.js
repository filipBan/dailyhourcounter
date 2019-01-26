import firebase from "../../../firebaseConfig";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_WAGES = "UPDATE_WAGES";
export const UPDATE_WAGES_INPUT = "UPDATE_WAGES_INPUT";

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
