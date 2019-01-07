import firebase from "../../../firebaseConfig";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_START = "AUTH_START";
export const AUTH_END = "AUTH_END";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const UPDATE_INPUT = "UPDATE_INPUT";

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

export const logInWithEmailAndPassword = (
  email,
  password
) => async dispatch => {
  try {
    dispatch({ type: AUTH_START });
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch({ type: AUTH_SUCCESS, payload: user.user });
    dispatch(fetchUserData(user.user.uid));
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error });
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: AUTH_LOGOUT });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.message });
  }
};

export const saveLoggedUserSession = user => dispatch => {
  if (user) {
    dispatch(fetchUserData(user.uid));
    return dispatch({ type: AUTH_SUCCESS, payload: user });
  }
  return dispatch({ type: AUTH_END });
};

export const updateInput = (field, value) => dispatch =>
  dispatch({ type: UPDATE_INPUT, payload: { field, value } });
