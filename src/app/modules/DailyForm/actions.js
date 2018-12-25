import { differenceInMilliseconds, getHours, format, getTime } from "date-fns";
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

export const resetDailyData = ({ workStart, uid }) => async dispatch => {
  const today = new Date().toString();
  const year = workStart ? format(workStart, "YYYY") : format(today, "YYYY");
  const month = workStart ? format(workStart, "M") : format(today, "M");
  const day = workStart ? format(workStart, "D") : format(today, "D");

  const result = await firebase
    .database()
    .ref(`dates/${uid}/${year}/${month}/${day}`)
    .remove();
  return dispatch({ type: RESET_DAY_DATA });
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
    workStart &&
    workEnd &&
    differenceInMilliseconds(workEnd, workStart) / 1000 / 60 / 60;

  if (workEnd && workStart && getHours(workEnd) < getHours(workStart)) {
    const total = 24 - Math.abs(result);
    return parseFloat(total.toFixed(2));
  } else if (workEnd && workStart && getHours(workEnd) > getHours(workStart)) {
    return parseFloat(result.toFixed(2));
  }
};

export const calculateTotalBreaks = (breakStart, breakEnd) => {
  if (breakEnd > breakStart) {
    const result =
      breakStart &&
      breakEnd &&
      differenceInMilliseconds(breakEnd, breakStart) / 1000 / 60 / 60;
    return result;
  }
  return 0;
};

export const saveHoursAndBreaksToFirebase = dayData => async (
  dispatch,
  getState
) => {
  const {
    today,
    workStart,
    workEnd,
    breakStart,
    breakEnd,
    timeWorked,
    totalBreaks,
    wages,
    uid
  } = dayData;

  if (!workStart || !workEnd) {
    return;
  }

  const currentWages = getState().settings.wages;

  const year = workStart ? format(workStart, "YYYY") : format(today, "YYYY");
  const month = workStart ? format(workStart, "M") : format(today, "M");
  const day = workStart ? format(workStart, "D") : format(today, "D");
  const startOfBreak = breakStart ? getTime(breakStart) : null;
  const endOfBreak = breakEnd ? getTime(breakEnd) : null;
  const breakTotal = totalBreaks ? totalBreaks : 0;
  const workedTotal = timeWorked ? timeWorked : 0;
  const wage = wages ? wages : currentWages;
  const startOfWork = workStart ? getTime(workStart) : getTime(today);
  const endOfWork = workEnd ? getTime(workEnd) : getTime(today);

  console.log({
    year,
    month,
    day,
    startOfBreak,
    endOfBreak,
    breakTotal,
    workedTotal,
    wage,
    startOfWork,
    endOfWork
  });

  try {
    dispatch({ type: START_SAVING_DAY_DATA });
    const result = await firebase
      .database()
      .ref(`dates/${uid}/${year}/${month}/${day}`)
      .update({
        breakEnd: endOfBreak,
        breakStart: startOfBreak,
        breaks: breakTotal,
        hours: workedTotal,
        wages: wage,
        workEnd: endOfWork,
        workStart: startOfWork
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
    const year = format(today, "YYYY");
    const month = format(today, "M");
    const day = format(today, "D");
    const output = {};
    const result = await firebase
      .database()
      .ref(`dates/${uid}/${year}/${month}/${day}`)
      .once("value", snapshot => {
        snapshot.forEach(child => {
          output[child.key] = child.val();
        });
      });
    return dispatch({ type: REPLACE_DAY_DATA, payload: output });
  } catch (err) {
    console.log(err);
  }
};
