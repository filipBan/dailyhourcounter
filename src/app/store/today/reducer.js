import {
  START_SAVING_DAY_DATA,
  FINISHED_SAVING_DAY_DATA,
  START_FETCHING_DAY_DATA,
  FINISH_FETCHING_DAY_DATA,
  ERROR_SAVING_DAY_DATA,
  ERROR_FETCHING_DAY_DATA,
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
  loadingData: false,
  wages: null
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

const today = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_DATE:
      return {
        ...state,
        today: action.date || state.today
      };
    case START_FETCHING_DAY_DATA:
      return {
        ...state,
        loadingData: true
      };
    case FINISH_FETCHING_DAY_DATA:
      return {
        ...state,
        loadingData: false
      };
    case ERROR_FETCHING_DAY_DATA:
      return {
        ...state,
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
        workedMinutes: getMinutes(state.hours, state.breaks, action)
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
        breakMinutes: getMinutes(state.hours, state.breaks, action)
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
        savingData: false
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
        wages: action.payload.wages || null
      };

    case RESET_DAY_DATA:
      return {
        ...initialState,
        today: state.today
      };

    case "AUTH_LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default today;
