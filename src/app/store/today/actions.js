import { differenceInMinutes, startOfDay, getTime } from "date-fns";
import firebase from "../../../firebaseConfig";

export const SET_TODAY_DATE = "SET_TODAY_DATE";

export const UPDATE_HOURS = "UPDATE_HOURS";
export const UPDATE_BREAKS = "UPDATE_BREAKS";
export const CLEAR_ALL_TIMES = "CLEAR_ALL_TIMES";
export const SAVE_TIMES_TO_FIREBASE = "SAVE_TIMES_TO_FIREBASE";
export const START_FETCHING_DAY_DATA = "START_FETCHING_DAY_DATA";
export const FINISH_FETCHING_DAY_DATA = "FINISH_FETCHING_DAY_DATA";
export const REPLACE_DAY_DATA = "REPLACE_DAY_DATA";
export const ERROR_FETCHING_DAY_DATA = "ERROR_FETCHING_DAY_DATA";

export const START_SAVING_DAY_DATA = "START_SAVING_DAY_DATA";
export const FINISHED_SAVING_DAY_DATA = "FINISHED_SAVING_DAY_DATA";
export const ERROR_SAVING_DAY_DATA = "ERROR_SAVING_DAY_DATA";
export const CLEAR_TODAY_ERRORS = "CLEAR_TODAY_ERRORS";

export const TOGGLE_CALENDAR = "TOGGLE_CALENDAR";

export const RESET_DAY_DATA = "RESET_DAY_DATA";

//TODO - save daily data to localforage first and then load from local memory first.
// If item is not in local memory then attempt to fetch from database and add to
// local memory if it's there. Will also affect generating reports, as they also should ask
// local memory first

export const resetDailyData = ({ today, uid }) => async dispatch => {
  dispatch({ type: START_SAVING_DAY_DATA });
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
  if (workStart && workEnd && getTime(workEnd) > getTime(workStart)) {
    return differenceInMinutes(workEnd, workStart);
  }
  return 0;
};

export const calculateTotalBreaks = (breakStart, breakEnd) => {
  if (breakStart && breakEnd && getTime(breakEnd) > getTime(breakStart)) {
    return differenceInMinutes(breakEnd, breakStart);
  }
  return 0;
};

const checkForErrors = (hours, breaks) => {
  const workStart = hours[0].start;
  const workEnd = hours[0].end;
  const breakStart = breaks[0].start;
  const breakEnd = breaks[0].end;
  if (
    (!workStart && !workEnd) ||
    (workStart && !workEnd) ||
    (!workStart && workEnd)
  ) {
    return "You need to provide work start and end times to save.";
  }

  if ((breakStart && !breakEnd) || (!breakStart && breakEnd)) {
    return "You need to provide both break start and end times to save them.";
  }

  if (getTime(workStart) === getTime(workEnd)) {
    return "Work start and end can't be the same.";
  }

  if (getTime(breakStart) === getTime(breakEnd)) {
    return "Break start and end can't be the same.";
  }

  if (getTime(workStart) > getTime(workEnd)) {
    return "Work can't end before it started. If you worked overnight remember to also change the day.";
  }

  if (breakStart && getTime(breakStart) < getTime(workStart)) {
    return "Break can't start before work start.";
  }

  if (breakStart && getTime(breakStart) > getTime(workEnd)) {
    return "Break can't start after works' end.";
  }

  if (breakStart && breakEnd && getTime(breakStart) > getTime(breakEnd)) {
    return "Break can't start after it ended.";
  }

  if (breakEnd && getTime(breakEnd) > getTime(workEnd)) {
    return "Break can't finish after works' end.";
  }

  return null;
};

export const saveHoursAndBreaksToFirebase = dayData => async (
  dispatch,
  getState
) => {
  const {
    error,
    hours,
    breaks,
    today,
    workedMinutes,
    breakMinutes,
    wages,
    uid
  } = dayData;

  console.log(dayData);

  if (error) {
    return;
  }

  const savingError = checkForErrors(hours, breaks);

  if (savingError) {
    return dispatch({
      type: ERROR_SAVING_DAY_DATA,
      error: savingError
    });
  }

  try {
    dispatch({ type: START_SAVING_DAY_DATA });

    await firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .set({
        date: getTime(startOfDay(today)),
        wages: wages || getState().profile.wages,
        hours,
        breaks,
        workedMinutes,
        breakMinutes
      });

    return dispatch({ type: FINISHED_SAVING_DAY_DATA });
  } catch (error) {
    console.log(error);
    return dispatch({ type: ERROR_SAVING_DAY_DATA, error: error.message });
  }
};

export const handleCalendarChange = date => dispatch => {
  dispatch({ type: SET_TODAY_DATE, date });
  dispatch({ type: CLEAR_ALL_TIMES });
};

export const fetchDailyData = ({ uid, today }) => async dispatch => {
  dispatch({ type: START_FETCHING_DAY_DATA });
  try {
    const data = await firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .get()
      .then(doc => doc.data());

    const result = data
      ? {
          ...data,
          hours: data.hours.map(item => ({
            start: item.start ? item.start.toDate() : null,
            end: item.end ? item.end.toDate() : null
          })),
          breaks: data.breaks.map(item => ({
            start: item.start ? item.start.toDate() : null,
            end: item.end ? item.end.toDate() : null
          }))
        }
      : {};

    dispatch({ type: FINISH_FETCHING_DAY_DATA });
    return dispatch({ type: REPLACE_DAY_DATA, payload: result });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_FETCHING_DAY_DATA, error: error.message });
  }
};

export const clearTodayErrors = () => ({ type: CLEAR_TODAY_ERRORS });
