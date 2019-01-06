import firebase from "../../../firebaseConfig";
import { startOfDay, getTime } from "date-fns";

export const UPDATE_REPORT_START_DATE = "UPDATE_REPORT_START_DATE";
export const UPDATE_REPORT_END_DATE = "UPDATE_REPORT_END_DATE";
export const UPDATE_REPORT_DATA = "UPDATE_REPORT_DATA";
export const START_FETCHING_REPORT_DATA = "START_FETCHING_REPORT_DATA";
export const ERROR_FETCHING_REPORT_DATA = "ERROR_FETCHING_REPORT_DATA";

export const changeReportStartDay = date => ({
  type: UPDATE_REPORT_START_DATE,
  date
});

export const changeReportEndDay = date => ({
  type: UPDATE_REPORT_END_DATE,
  date
});

export const fetchDateRangeData = (start, end, uid) => async dispatch => {
  const startDay = getTime(startOfDay(start));
  const endDay = getTime(startOfDay(end));

  try {
    dispatch({ type: START_FETCHING_REPORT_DATA });
    const rawData = [];
    await firebase
      .firestore()
      .collection("dates")
      .doc(uid)
      .collection("records")
      .where("date", ">=", startDay)
      .where("date", "<=", endDay)
      .get()
      .then(snapshot => snapshot.forEach(item => rawData.push(item.data())));

    const result = rawData.map(item => ({
      ...item,
      hours: item.hours.map(item => ({
        start: item.start ? item.start.toDate() : null,
        end: item.end ? item.end.toDate() : null
      })),
      breaks: item.breaks.map(item => ({
        start: item.start ? item.start.toDate() : null,
        end: item.end ? item.end.toDate() : null
      }))
    }));

    dispatch({ type: UPDATE_REPORT_DATA, data: result });
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR_FETCHING_REPORT_DATA, error });
  }
};
