import firebase from "../../../firebaseConfig";

export const registerNewAccount = props => async dispatch => {
  const { email, password, userName, wages } = props;
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const currentUser = firebase.auth().currentUser;

    currentUser.sendEmailVerification();

    const { uid } = user.user;

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        uid,
        userName,
        wages
      });

    dispatch({ type: "REGISTRATION COMPLETE" });
  } catch (error) {
    console.error(error);
  }
};
