import firebase from "../../../firebaseConfig";
import { fetchUserData } from "../profile/actions";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_START = "AUTH_START";
export const AUTH_END = "AUTH_END";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const REGISTRATION_COMPLETE = "REGISTRATION_COMPLETE";
export const UPDATE_INPUT = "UPDATE_INPUT";

export const SENDING_VERIFICATION_EMAIL = "SENDING_VERIFICATION_EMAIL";
export const VERIFICATION_EMAIL_SENT = "VERIFICATION_EMAIL_SENT";
export const VERIFICATION_EMAIL_ERROR = "VERIFICATION_EMAIL_ERROR";

export const SENDING_PASSWORD_RESET_EMAIL = "SENDING_PASSWORD_RESET_EMAIL";
export const PASSWORD_RESET_EMAIL_SENT = "PASSWORD_RESET_EMAIL_SENT";
export const PASSWORD_RESET_EMAIL_ERROR = "PASSWORD_RESET_EMAIL_ERROR";

export const logInWithEmailAndPassword = (email, password) => dispatch => {
  dispatch({ type: AUTH_START });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(e => dispatch({ type: AUTH_FAIL, error: e.message }));
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch({ type: AUTH_START });
    await firebase.auth().signOut();
    dispatch({ type: AUTH_LOGOUT });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error: error.message });
  }
};

export const saveLoggedUserSession = user => dispatch => {
  if (user) {
    dispatch(fetchUserData(user.uid));
    return dispatch({ type: AUTH_SUCCESS, payload: user });
  }
  return dispatch({ type: AUTH_END });
};

export const updateInput = (screen, field, value) => dispatch =>
  dispatch({ type: UPDATE_INPUT, payload: { screen, field, value } });

// const addWelcomeNotice = async uid => {
//   try {
//     await firebase
//       .firestore()
//       .collection("notifications")
//       .doc(uid)
//       .collection("notices")
//       .add({
//         content:
//           "You now have access to a 14 day full trial. After it's over you can get the premium account from your profile page. (It's in the top left menu)",
//         footer: "Enjoy :)",
//         header: "Great to see you!",
//         read: false,
//         subheader: "Thanks for subscribing!",
//         type: "welcome"
//       });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const addUserRecordToDb = async (uid, userName, wages) => {
  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        uid,
        userName,
        wages: parseFloat(wages),
        currency: "GBP"
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const registerNewAccount = ({
  email,
  password,
  userName,
  wages
}) => async dispatch => {
  try {
    dispatch({ type: AUTH_START });
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const currentUser = firebase.auth().currentUser;

    currentUser.sendEmailVerification();

    const { uid } = user.user;

    await addUserRecordToDb(uid, userName, wages);

    // await addWelcomeNotice(uid);

    dispatch({ type: REGISTRATION_COMPLETE });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error: error.message });
  }
};

export const authError = error => ({ type: AUTH_FAIL, error });

export const sendEmailVerification = () => async dispatch => {
  try {
    dispatch({ type: SENDING_VERIFICATION_EMAIL });
    await firebase.auth().currentUser.sendEmailVerification({
      url: "https://record.dailyhours.app"
    });
    dispatch({ type: VERIFICATION_EMAIL_SENT });
  } catch (error) {
    console.error(error);
    dispatch({ type: VERIFICATION_EMAIL_ERROR, error: error.message });
  }
};

export const sendResetPasswordEmail = email => async dispatch => {
  try {
    dispatch({ type: SENDING_PASSWORD_RESET_EMAIL });
    await firebase.auth().sendPasswordResetEmail(email);
    dispatch({ type: PASSWORD_RESET_EMAIL_SENT, email });
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_EMAIL_ERROR, error: error.message });
  }
};
