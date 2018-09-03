import moment from "moment";
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
  const today = moment();
  const year = workStart ? workStart.format("YYYY") : today.format("YYYY");
  const month = workStart ? workStart.format("M") : today.format("M");
  const day = workStart ? workStart.format("D") : today.format("D");
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
  const difference =
    workStart && workEnd && moment.duration(workEnd.diff(workStart));
  const result = difference.asMilliseconds() / 1000 / 60 / 60;

  if (workEnd && workStart && workEnd.hour() < workStart.hour()) {
    const total = 24 - Math.abs(result);
    console.log("Hours", { total });
    return parseFloat(total.toFixed(1));
  } else if (workEnd && workStart && workEnd.hour() > workStart.hour()) {
    console.log("Hours", { result });
    return parseFloat(result.toFixed(1));
  }
};

export const calculateTotalBreaks = (breakStart, breakEnd) => {
  if (breakEnd > breakStart) {
    const difference = moment.duration(breakEnd.diff(breakStart));
    const result = (difference.hours() * 60 + difference.minutes()) / 60;
    console.log("Breaks: ", { result });
    return result;
  }
  return 0;
};

export const saveHoursAndBreaksToFirebase = dayData => async dispatch => {
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

  const year = workStart ? workStart.format("YYYY") : today.format("YYYY");
  const month = workStart ? workStart.format("M") : today.format("M");
  const day = workStart ? workStart.format("D") : today.format("D");
  const startOfBreak = breakStart ? breakStart.unix() : null;
  const endOfBreak = breakEnd ? breakEnd.unix() : null;
  const breakTotal = totalBreaks ? totalBreaks : 0;
  const workedTotal = timeWorked ? timeWorked : 0;
  const wage = wages ? wages : 0;
  const startOfWork = workStart ? workStart.unix() : today.unix();
  const endOfWork = workEnd ? workEnd.unix() : today.unix();

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
    console.log(result);
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
    const year = today.format("YYYY");
    const month = today.format("M");
    const day = today.format("D");
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
