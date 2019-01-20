import {
  CLEAR_REPORT_DATA,
  ERROR_FETCHING_REPORT_DATA,
  START_FETCHING_REPORT_DATA,
  UPDATE_REPORT_START_DATE,
  UPDATE_REPORT_END_DATE,
  UPDATE_REPORT_DATA
} from "./actions";

const initialState = {
  reportStartDate: null,
  reportEndDate: null,
  reportData: null,
  fetching: false
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REPORT_START_DATE:
      return {
        ...state,
        reportStartDate: action.date
      };
    case START_FETCHING_REPORT_DATA:
      return {
        ...state,
        fetching: true
      };
    case UPDATE_REPORT_END_DATE:
      return {
        ...state,
        reportEndDate: action.date
      };
    case UPDATE_REPORT_DATA:
      return {
        ...state,
        reportData: action.data,
        fetching: false
      };
    case ERROR_FETCHING_REPORT_DATA:
      return {
        ...state,
        fetching: false
      };
    case CLEAR_REPORT_DATA:
      return initialState;
    default:
      return state;
  }
};

export default reports;
