import { getTime } from "date-fns";

import {
  START_SAVING_DAY_DATA,
  START_FETCHING_DAY_DATA,
  FINISHED_SAVING_DAY_DATA,
  ERROR_SAVING_DAY_DATA,
  ERROR_FETCHING_DAY_DATA,
  UPDATE_BREAKS,
  UPDATE_HOURS,
  SET_TODAY_DATE,
  CLEAR_ALL_TIMES,
  CLEAR_TODAY_ERRORS,
  REPLACE_DAY_DATA,
  RESET_DAY_DATA,
  calculateTimeWorked,
  calculateTotalBreaks
} from "./actions";

const initialState = {
  today: new Date(),
  hours: [
    {
      start: null,
      end: null
    }
  ],
  breaks: [
    {
      start: null,
      end: null
    }
  ],
  workedMinutes: 0,
  breakMinutes: 0,
  savingData: false,
  error: null,
  savingDisabled: false,
  loadingData: false
};

const getMinutes = (hours, breaks, action) => {
  switch (action.timeType) {
    case "workStart":
      return calculateTimeWorked(action.amount, hours[0].end);
    case "workEnd":
      return calculateTimeWorked(hours[0].start, action.amount);
    case "breakStart":
      return calculateTotalBreaks(action.amount, breaks[0].end);
    case "breakEnd":
      return calculateTotalBreaks(breaks[0].start, action.amount);

    default:
      return null;
  }
};

const checkForErrors = (hours, breaks, action) => {
  switch (action.timeType) {
    case "workStart":
      if (getTime(action.amount) > getTime(hours[0].end)) {
        return "If you worked overnight remember to change the day as well by clicking on the day label in time picker.";
      } else if (
        breaks[0].end &&
        getTime(action.amount) > getTime(breaks[0].end)
      ) {
        return "Work can't start after a break ends.";
      } else if (
        breaks[0].start &&
        getTime(action.amount) > getTime(breaks[0].start)
      ) {
        return "Work can't start after a break start.";
      }

      return null;

    case "workEnd":
      if (getTime(action.amount) < getTime(hours[0].start)) {
        return "If you worked overnight remember to change the day as well by clicking on the day label in time picker.";
      } else if (
        breaks[0].end &&
        getTime(action.amount) < getTime(breaks[0].end)
      ) {
        return "Break can't end after works' end.";
      } else if (
        breaks[0].start &&
        getTime(action.amount) < getTime(breaks[0].start)
      ) {
        return "Break can't start after works' end.";
      }

      return null;

    case "breakStart":
      if (getTime(action.amount) < getTime(hours[0].start)) {
        return "Break can't start before you get to work.";
      } else if (getTime(action.amount) > getTime(hours[0].end)) {
        return "Break can't start after works' end.";
      } else if (
        breaks[0].end &&
        getTime(action.amount) > getTime(breaks[0].end)
      ) {
        return "Break can't start after breaks' end.";
      }

      return null;
    case "breakEnd":
      if (getTime(action.amount) < getTime(hours[0].start)) {
        return "Break can't end before you get to work.";
      } else if (getTime(action.amount) > getTime(hours[0].end)) {
        return "Break can't end after works' end.";
      } else if (getTime(action.amount) < getTime(breaks[0].start)) {
        return "Break can't end before it started.";
      }

      return null;
    default:
      return null;
  }
};

const today = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_DATE:
      return {
        ...state,
        today: action.date
      };
    case START_FETCHING_DAY_DATA:
      return {
        ...state,
        loadingData: true
      };
    case ERROR_FETCHING_DAY_DATA:
      return {
        ...state,
        error: action.error,
        loadingData: false
      };
    case UPDATE_HOURS:
      return {
        ...state,
        hours: [
          {
            start:
              action.timeType === "workStart"
                ? action.amount
                : state.hours[0].start,
            end:
              action.timeType === "workEnd" ? action.amount : state.hours[0].end
          }
        ],
        workedMinutes: getMinutes(state.hours, state.breaks, action),
        error: checkForErrors(state.hours, state.breaks, action),
        savingDisabled: Boolean(
          checkForErrors(state.hours, state.breaks, action)
        )
      };
    case UPDATE_BREAKS:
      return {
        ...state,
        breaks: [
          {
            start:
              action.timeType === "breakStart"
                ? action.amount
                : state.breaks[0].start,
            end:
              action.timeType === "breakEnd"
                ? action.amount
                : state.breaks[0].end
          }
        ],
        breakMinutes: getMinutes(state.hours, state.breaks, action),
        error: checkForErrors(state.hours, state.breaks, action),
        savingDisabled: Boolean(
          checkForErrors(state.hours, state.breaks, action)
        )
      };
    case START_SAVING_DAY_DATA:
      return {
        ...state,
        savingData: true
      };
    case FINISHED_SAVING_DAY_DATA:
      return {
        ...state,
        savingData: false
      };
    case ERROR_SAVING_DAY_DATA:
      return {
        ...state,
        savingData: false,
        error: action.error
      };
    case CLEAR_ALL_TIMES:
      return {
        ...state,
        hours: [
          {
            start: null,
            end: null
          }
        ],
        breaks: [
          {
            start: null,
            end: null
          }
        ],
        workedMinutes: 0,
        breakMinutes: 0
      };

    case REPLACE_DAY_DATA:
      return {
        ...state,
        ...action.payload,
        loadingData: false
      };

    case CLEAR_TODAY_ERRORS:
      return {
        ...state,
        error: null
      };

    case RESET_DAY_DATA:
      return {
        ...initialState,
        today: state.today
      };
    default:
      return state;
  }
};

export default today;
