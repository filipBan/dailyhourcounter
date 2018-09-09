import firebase from "../../../firebaseConfig";
import moment from "moment";

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
  const result = [];
  for (let i = startDay; i <= endDay; i++) {
    const year = moment()
      .dayOfYear(i)
      .format("YYYY");
    const month = moment()
      .dayOfYear(i)
      .format("M");
    const day = moment()
      .dayOfYear(i)
      .format("D");

    result.push({ year, month, day });
  }

  return result;
};

export const fetchDateRangeData = (start, end, uid) => async dispatch => {
  const startDay = start.dayOfYear();
  const endDay = end.dayOfYear();

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
