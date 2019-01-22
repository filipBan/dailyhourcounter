import firebase from "../../../firebaseConfig";

export const UPDATE_WAGES = "UPDATE_WAGES";
export const UPDATE_WAGES_INPUT = "UPDATE_WAGES_INPUT";

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
