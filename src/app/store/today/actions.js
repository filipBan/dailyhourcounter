import { differenceInMinutes, startOfDay, getTime } from "date-fns";
import localforage from "localforage";

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

export const resetDailyData = ({ today, uid }) => async dispatch => {
  dispatch({ type: START_SAVING_DAY_DATA });

  try {
    await localforage.removeItem(
      `${getTime(startOfDay(today)).toString()}-${uid}`
    );

    firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .delete();

    return dispatch({ type: RESET_DAY_DATA });
  } catch (error) {
    console.error("Error resetting", error);
    return dispatch({ type: ERROR_SAVING_DAY_DATA, error: error.message });
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

//TODO - rethink how documents are called in database - maybe better to use
// formatted dates like '20190130' instaed of Unix strings? Will that be more
// forgiving when changing timezones? Do I need to care?

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

    const newRecord = {
      date: getTime(startOfDay(today)),
      wages: wages || getState().profile.wages,
      hours,
      breaks,
      workedMinutes,
      breakMinutes
    };

    await localforage.setItem(
      `${getTime(startOfDay(today)).toString()}-${uid}`,
      newRecord
    );

    firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .doc(getTime(startOfDay(today)).toString())
      .set(newRecord);

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
    const localData = await localforage.getItem(
      `${getTime(startOfDay(today)).toString()}-${uid}`
    );

    if (localData) {
      const result = {
        ...localData,
        hours: localData.hours.map(item => ({
          start: item.start ? item.start : null,
          end: item.end ? item.end : null
        })),
        breaks: localData.breaks.map(item => ({
          start: item.start ? item.start : null,
          end: item.end ? item.end : null
        }))
      };

      dispatch({ type: FINISH_FETCHING_DAY_DATA });
      return dispatch({ type: REPLACE_DAY_DATA, payload: result });
    }

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

    if (data) {
      localforage.setItem(
        `${getTime(startOfDay(today)).toString()}-${uid}`,
        result
      );
    }

    dispatch({ type: FINISH_FETCHING_DAY_DATA });
    return dispatch({ type: REPLACE_DAY_DATA, payload: result });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_FETCHING_DAY_DATA, error: error.message });
  }
};

export const clearTodayErrors = () => ({ type: CLEAR_TODAY_ERRORS });
