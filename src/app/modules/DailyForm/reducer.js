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
  workStart: null,
  workEnd: null,
  breakStart: null,
  breakEnd: null,
  minutesWorked: 0,
  totalBreaks: 0,
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
        [action.timeType]: action.amount,
        minutesWorked:
          action.timeType === "workEnd"
            ? calculateTimeWorked(state.workStart, action.amount)
            : action.timeType === "workStart" && state.workEnd
            ? calculateTimeWorked(action.amount, state.workEnd)
            : state.minutesWorked
      };
    case UPDATE_BREAKS:
      return {
        ...state,
        [action.timeType]: action.amount,
        totalBreaks:
          action.timeType === "breakEnd"
            ? calculateTotalBreaks(state.breakStart, action.amount)
            : action.timeType === "breakStart" && state.breakEnd
            ? calculateTotalBreaks(action.amount, state.breakEnd)
            : state.totalBreaks
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
        workStart: null,
        workEnd: null,
        breakStart: null,
        breakEnd: null,
        minutesWorked: 0,
        totalBreaks: 0
      };

    case REPLACE_DAY_DATA:
      return {
        ...state,
        breakEnd: action.payload.breakEnd
          ? new Date(action.payload.breakEnd)
          : null,
        breakStart: action.payload.breakStart
          ? new Date(action.payload.breakStart)
          : null,
        totalBreaks: action.payload.breaks ? action.payload.breaks : null,
        minutesWorked: action.payload.hours ? action.payload.hours : null,
        workEnd: action.payload.workEnd
          ? new Date(action.payload.workEnd)
          : null,
        workStart: action.payload.workStart
          ? new Date(action.payload.workStart)
          : null
      };

    case RESET_DAY_DATA:
      return initialState;
    default:
      return state;
  }
};

export default today;
