import firebase from "../../../firebaseConfig";
import { addDays, format, differenceInDays } from "date-fns";

export const UPDATE_REPORT_START_DATE = "UPDATE_REPORT_START_DATE";
export const UPDATE_REPORT_END_DATE = "UPDATE_REPORT_END_DATE";
export const UPDATE_REPORT_DATA = "UPDATE_REPORT_DATA";

export const changeReportStartDay = date => ({
  type: UPDATE_REPORT_START_DATE,
  date
});

export const changeReportEndDay = date => ({
  type: UPDATE_REPORT_END_DATE,
  date
});

const getReportDates = (startDay, endDay) => {
  const difference = differenceInDays(endDay, startDay);
  const result = [];

  for (let i = 0; i <= difference; i++) {
    let currentDay = addDays(startDay, i);

    const year = format(currentDay, "YYYY");
    const month = format(currentDay, "M");
    const day = format(currentDay, "D");

    result.push({ year, month, day });
  }

  return result;
};

export const fetchDateRangeData = (start, end, uid) => async dispatch => {
  const startDay = start;
  const endDay = end;

  const reportDates = getReportDates(startDay, endDay);

  const firebaseData = reportDates.map(date =>
    firebase
      .database()
      .ref(`dates/${uid}/${date.year}/${date.month}/${date.day}`)
      .once("value")
      .then(snapshot => snapshot.val())
  );

  const data = await Promise.all(firebaseData);

  dispatch({ type: UPDATE_REPORT_DATA, data });
};
