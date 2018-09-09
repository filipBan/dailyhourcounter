import {
  UPDATE_REPORT_START_DATE,
  UPDATE_REPORT_END_DATE,
  UPDATE_REPORT_DATA
} from "./actions";

const initialState = {
  reportStartDate: null,
  reportEndDate: null,
  reportData: null
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REPORT_START_DATE:
      return {
        ...state,
        reportStartDate: action.date
      };
    case UPDATE_REPORT_END_DATE:
      return {
        ...state,
        reportEndDate: action.date
      };
    case UPDATE_REPORT_DATA:
      return {
        ...state,
        reportData: action.data
      };
    default:
      return state;
  }
};

export default reports;
