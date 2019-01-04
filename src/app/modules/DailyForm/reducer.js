import {
  START_SAVING_DAY_DATA,
  FINISHED_SAVING_DAY_DATA,
  ERROR_SAVING_DAY_DATA,
  UPDATE_BREAKS,
  UPDATE_HOURS,
  SET_TODAY_DATE,
  CLEAR_ALL_TIMES,
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
  error: null
};

const today = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_DATE:
      return {
        ...state,
        today: action.date
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
        workedMinutes:
          action.timeType === "workEnd"
            ? calculateTimeWorked(state.hours[0].start, action.amount)
            : action.timeType === "workStart" && state.workEnd
            ? calculateTimeWorked(action.amount, state.hours[0].end)
            : state.workedMinutes
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
        breakMinutes:
          action.timeType === "breakEnd"
            ? calculateTotalBreaks(state.breaks[0].start, action.amount)
            : action.timeType === "breakStart" && state.breakEnd
            ? calculateTotalBreaks(action.amount, state.breaks[0].end)
            : state.breakMinutes
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
        ...action.payload
      };

    case RESET_DAY_DATA:
      return initialState;
    default:
      return state;
  }
};

export default today;
