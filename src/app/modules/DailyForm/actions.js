import { differenceInMinutes, startOfDay, getTime } from "date-fns";
import firebase from "../../../firebaseConfig";

export const SET_TODAY_DATE = "SET_TODAY_DATE";

export const UPDATE_HOURS = "UPDATE_HOURS";
export const UPDATE_BREAKS = "UPDATE_BREAKS";
export const CLEAR_ALL_TIMES = "CLEAR_ALL_TIMES";
export const SAVE_TIMES_TO_FIREBASE = "SAVE_TIMES_TO_FIREBASE";
export const REPLACE_DAY_DATA = "REPLACE_DAY_DATA";

export const START_SAVING_DAY_DATA = "START_SAVING_DAY_DATA";
export const FINISHED_SAVING_DAY_DATA = "FINISHED_SAVING_DAY_DATA";
export const ERROR_SAVING_DAY_DATA = "ERROR_SAVING_DAY_DATA";

export const TOGGLE_CALENDAR = "TOGGLE_CALENDAR";

export const RESET_DAY_DATA = "RESET_DAY_DATA";

export const resetDailyData = ({ today, uid }) => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .delete();

    return dispatch({ type: RESET_DAY_DATA });
  } catch (err) {
    console.error(err);
  }
};

export const updateHours = (timeType, amount) => ({
  type: UPDATE_HOURS,
  timeType,
  amount
});

export const updateBreaks = (timeType, amount) => ({
  type: UPDATE_BREAKS,
  timeType,
  amount
});

export const calculateTimeWorked = (workStart, workEnd) => {
  const result =
    workStart && workEnd && differenceInMinutes(workEnd, workStart);

  return result;
};

export const calculateTotalBreaks = (breakStart, breakEnd) => {
  if (breakEnd > breakStart) {
    const result =
      breakStart && breakEnd && differenceInMinutes(breakEnd, breakStart);
    return result;
  }
  return 0;
};

export const saveHoursAndBreaksToFirebase = dayData => async (
  dispatch,
  getState
) => {
  const {
    hours,
    breaks,
    today,
    workedMinutes,
    breakMinutes,
    wages,
    uid
  } = dayData;

  if (!hours[0].start || !hours[0].end) {
    return;
  }

  try {
    dispatch({ type: START_SAVING_DAY_DATA });

    firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .set({
        date: getTime(startOfDay(today)).toString(),
        wages: wages || getState().settings.wages,
        hours,
        breaks,
        workedMinutes,
        breakMinutes
      });

    return dispatch({ type: FINISHED_SAVING_DAY_DATA });
  } catch (error) {
    console.log(error);
    return dispatch({ type: ERROR_SAVING_DAY_DATA, error });
  }
};

export const toggleCalendar = () => ({ type: TOGGLE_CALENDAR });

export const handleCalendarChange = date => dispatch => {
  dispatch({ type: SET_TODAY_DATE, date });
  dispatch({ type: CLEAR_ALL_TIMES });
};

export const fetchDailyData = ({ uid, today }) => async dispatch => {
  try {
    const data = await firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .get()
      .then(doc => doc.data());

    const result = {
      ...data,
      hours: data.hours.map(item => ({
        start: item.start ? item.start.toDate() : null,
        end: item.end ? item.end.toDate() : null
      })),
      breaks: data.breaks.map(item => ({
        start: item.start ? item.start.toDate() : null,
        end: item.end ? item.end.toDate() : null
      }))
    };

    return dispatch({ type: REPLACE_DAY_DATA, payload: result });
  } catch (err) {
    console.log(err);
  }
};
