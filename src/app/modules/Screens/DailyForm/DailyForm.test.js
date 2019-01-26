import React, { Suspense } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render, fireEvent, cleanup } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import thunk from "redux-thunk";

import DailyForm from "./DailyForm";
import reducer from "../../../store/reducers";
import {
  saveHoursAndBreaksToFirebase,
  updateBreaks,
  updateHours,
  fetchDailyData,
  resetDailyData,
  handleCalendarChange,
  clearTodayErrors
} from "../../../store/today/actions";

const initialState = Object.freeze({
  today: {
    today: new Date("2019-01-10T16:00Z"),
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
    loadingData: false
  },
  auth: {
    uid: "test-uid-string"
  },
  ui: {
    notification: {
      modalOpen: false,
      notification: {}
    },
    sideDrawer: {
      visible: false
    },
    snackbar: {
      message: "",
      type: ""
    }
  },
  reports: {},
  profile: { name: "", email: "", wages: 0 }
});

const mapStateToProps = state => ({
  ...state.today,
  wages: state.auth.wages,
  uid: state.auth.uid,
  auth: state.auth,
  notificationOpen: state.ui.notification.modalOpen
});

const mapDispatchToProps = dispatch => ({
  updateBreaks: (timeType, amount) => dispatch(updateBreaks(timeType, amount)),
  updateHours: (timeType, amount) => dispatch(updateHours(timeType, amount)),
  saveHoursAndBreaksToFirebase: dayData =>
    dispatch(saveHoursAndBreaksToFirebase(dayData)),
  fetchDailyData: props => dispatch(fetchDailyData(props)),
  resetDailyData: props => dispatch(resetDailyData(props)),
  handleCalendarChange: date => dispatch(handleCalendarChange(date)),
  clearTodayErrors: () => dispatch(clearTodayErrors())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

const ConnectedDailyForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DailyForm);

afterEach(cleanup);

function renderWithRedux(ui, store) {
  return {
    ...render(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
            <Suspense fallback={<div>Loading</div>}>{ui}</Suspense>
          </Router>
        </Provider>
      </MuiPickersUtilsProvider>
    ),
    store
  };
}

// =============================================
// Defaults and basic controls
// =============================================

describe("Daily Form integration tests", () => {
  it("Can render with redux with defaults", () => {
    const store = createStore(reducer, initialState);
    renderWithRedux(<ConnectedDailyForm fetchDailyData={() => {}} />, store);
  });

  it("Should match the snapshot", () => {
    const store = createStore(reducer, initialState);
    const { container } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(container).toMatchSnapshot();
  });

  it("Has correct start values in the select buttons", () => {
    const store = createStore(reducer, initialState);
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("work-start").textContent).toBe("Start");
    expect(getByLabelText("work-end").textContent).toBe("End");
    expect(getByLabelText("break-start").textContent).toBe("Start");
    expect(getByLabelText("break-end").textContent).toBe("End");
  });

  it("Has correct default date displayed in the top controls", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );
    expect(getByLabelText("top-controls").textContent).toBe(
      "Thursday 10th Jan 2019"
    );
  });

  it("Displays a correct date when forward button is clicked in top controls", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    fireEvent.click(getByLabelText("date-forward"));

    expect(getByLabelText("top-controls").textContent).toBe(
      "Friday 11th Jan 2019"
    );
  });

  it("Displays a correct date when back button is clicked in top controls", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    fireEvent.click(getByLabelText("date-back"));

    expect(getByLabelText("top-controls").textContent).toBe(
      "Wednesday 9th Jan 2019"
    );
  });

  // it("Displays a correct error message when trying to save with no data", () => {
  //   const store = createStore(reducer, initialState, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );

  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "You need to provide work start and end times to save."
  //   );
  // });

  it("Displays correct work start time when a date is changed", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    // don't know how to simulate change event on this node, testing framework
    // throws an error "The given element does not have a value setter".
    // Likely due to how the Mui-Pickers are implemented. Will manually
    // dispatch the relevant action instead. Same will go for all date/time pickers
    // across the app until I find a better solution.

    // fireEvent.change(getByLabelText("work-start-picker"), {
    //   target: { value: "2019-01-10T13:00" }
    // });

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T13:00"
    });

    expect(getByLabelText("work-start").textContent).toBe("13:00");
  });

  it("Displays correct work end time when a date is changed", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    // see "Displays correct work start time when a date is changed" for comments

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T18:00"
    });

    expect(getByLabelText("work-end").textContent).toBe("18:00");
  });

  it("Displays correct break start time when a date is changed", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    // see "Displays correct work start time when a date is changed" for comments

    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: "2019-01-10T15:00"
    });

    expect(getByLabelText("break-start").textContent).toBe("15:00");
  });

  it("Displays correct break end time when a date is changed", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    // see "Displays correct work start time when a date is changed" for comments

    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: "2019-01-10T15:00"
    });

    expect(getByLabelText("break-end").textContent).toBe("15:00");
  });

  it("All picker buttons except workStart to be disabled when none have data", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("work-end").disabled).toBeTruthy();
    expect(getByLabelText("break-start").disabled).toBeTruthy();
    expect(getByLabelText("break-end").disabled).toBeTruthy();
  });

  // =============================================
  // Input error handling
  // =============================================

  // it("Displays a correct error when trying to save with only work start provided", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T16:00"),
  //           end: null
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );

  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "You need to provide work start and end times to save."
  //   );
  // });

  // it("Displays a correct error when trying to save with work start, end and break start", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T10:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T11:00"),
  //           end: null
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "You need to provide both break start and end times to save them."
  //   );
  // });

  // it("Displays a correct error when trying to save with workStart > workEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T12:00"),
  //           end: new Date("2019-01-10T10:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Work can't end before it started. If you worked overnight remember to also change the day."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakStart < workStart", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T17:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T09:00"),
  //           end: new Date("2019-01-10T12:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break can't start before work start."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakStart > workEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T17:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T18:00"),
  //           end: new Date("2019-01-10T12:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break can't start after works' end."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakStart > breakEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T17:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T13:00"),
  //           end: new Date("2019-01-10T12:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break can't start after it ended."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakEnd > workEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T17:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T11:00"),
  //           end: new Date("2019-01-10T18:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break can't finish after works' end."
  //   );
  // });

  // it("Displays a correct error when trying to save with workStart === workEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T10:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Work start and end can't be the same."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakStart === breakEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T19:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T12:00"),
  //           end: new Date("2019-01-10T12:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break start and end can't be the same."
  //   );
  // });

  // it("Displays a correct error when trying to save with breakStart === breakEnd", () => {
  //   const state = {
  //     ...initialState,
  //     today: {
  //       ...initialState.today,
  //       hours: [
  //         {
  //           start: new Date("2019-01-10T10:00"),
  //           end: new Date("2019-01-10T19:00")
  //         }
  //       ],
  //       breaks: [
  //         {
  //           start: new Date("2019-01-10T12:00"),
  //           end: new Date("2019-01-10T12:00")
  //         }
  //       ]
  //     }
  //   };
  //   const store = createStore(reducer, state, applyMiddleware(thunk));
  //   const { getByLabelText } = renderWithRedux(
  //     <ConnectedDailyForm fetchDailyData={() => {}} />,
  //     store
  //   );
  //   fireEvent.click(getByLabelText("day-form-save"));

  //   expect(getByLabelText("snackbar").textContent).toBe(
  //     "Break start and end can't be the same."
  //   );
  // });

  // =============================================
  // Loading progress bar
  // =============================================

  it("Shows a loading bar when data fetching starts", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const mockFetchFunction = jest.fn();
    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={mockFetchFunction} />,
      store
    );

    // fetchDailyData will run in componentDidMount and dispatch the "START_FETCHING_DAY_DATA" action
    expect(mockFetchFunction).toHaveBeenCalledTimes(1);

    expect(queryByLabelText("loading-progress")).toBeNull();
    store.dispatch({ type: "START_FETCHING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeTruthy();
  });

  it("Hides the loading bar when data fetching stops", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({ type: "START_FETCHING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeTruthy();
    store.dispatch({ type: "FINISH_FETCHING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeNull();
  });

  it("Shows a loading progress bar when saving data", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const mockSaveFunction = jest.fn();

    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm
        fetchDailyData={() => {}}
        saveHoursAndBreaksToFirebase={mockSaveFunction}
      />,
      store
    );

    fireEvent.click(queryByLabelText("day-form-save"));

    expect(mockSaveFunction).toHaveBeenCalledTimes(1);

    expect(queryByLabelText("loading-progress")).toBeNull();
    store.dispatch({ type: "START_SAVING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeTruthy();
  });

  it("Hides the loading bar when data saving stops", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const mockSaveFunction = jest.fn();

    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm
        fetchDailyData={() => {}}
        saveHoursAndBreaksToFirebase={mockSaveFunction}
      />,
      store
    );

    fireEvent.click(queryByLabelText("day-form-save"));

    expect(mockSaveFunction).toHaveBeenCalledTimes(1);

    expect(queryByLabelText("loading-progress")).toBeNull();
    store.dispatch({ type: "START_SAVING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeTruthy();
    store.dispatch({ type: "FINISHED_SAVING_DAY_DATA" });
    expect(queryByLabelText("loading-progress")).toBeNull();
  });

  it("Calls the correct save function when saving the form", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const mockSaveFunction = jest.fn();

    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm
        fetchDailyData={() => {}}
        saveHoursAndBreaksToFirebase={mockSaveFunction}
      />,
      store
    );

    fireEvent.click(queryByLabelText("day-form-save"));

    expect(mockSaveFunction).toHaveBeenCalledTimes(1);
  });

  it("Resets all day data to defaults when reset button is clicked", () => {
    const state = {
      ...initialState,
      today: {
        ...initialState.today,
        hours: [
          {
            start: new Date("2019-01-10T11:00Z"),
            end: new Date("2019-01-10T15:00Z")
          }
        ],
        breaks: [
          {
            start: new Date("2019-01-10T11:00Z"),
            end: new Date("2019-01-10T15:00Z")
          }
        ]
      }
    };
    const store = createStore(reducer, state, applyMiddleware(thunk));
    const mockResetFunction = jest.fn();

    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm
        fetchDailyData={() => {}}
        resetDailyData={mockResetFunction}
      />,
      store
    );

    fireEvent.click(getByLabelText("reset-button"));

    expect(mockResetFunction).toHaveBeenCalledTimes(1);

    store.dispatch({ type: "RESET_DAY_DATA" });

    expect(getByLabelText("work-start").textContent).toBe("Start");
    expect(getByLabelText("work-end").textContent).toBe("End");
    expect(getByLabelText("break-start").textContent).toBe("Start");
    expect(getByLabelText("break-end").textContent).toBe("End");

    expect(store.getState()).toStrictEqual(initialState);
  });

  it("Displays 'No records' in the result card if no times are given", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("total-time-display").textContent).toBe("No records");
  });

  it("Displays 'No records' in the result card if invalid work times are given", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T15:00"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T11:00"
    });

    expect(getByLabelText("total-time-display").textContent).toBe("No records");
  });

  it("Displays 'No records' in the result card if invalid break times are given", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T15:00"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T19:00"
    });
    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: "2019-01-10T13:00"
    });
    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: "2019-01-10T18:00"
    });

    expect(getByLabelText("total-time-display").textContent).toBe("No records");
  });

  it("Displays a correct time calculation when only work times are given (full hours)", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T11:00"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T19:00"
    });

    expect(getByLabelText("total-time-display").textContent).toBe(
      "8h 0min total"
    );
  });

  it("Displays a correct time calculation when only work times are given (fraction hours)", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T11:24"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T18:47"
    });

    expect(getByLabelText("total-time-display").textContent).toBe(
      "7h 23min total"
    );
  });

  it("Displays a correct time calculation when only work times are given (overnight)", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T19:24"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-11T03:47"
    });

    expect(getByLabelText("total-time-display").textContent).toBe(
      "8h 23min total"
    );
  });

  it("Displays a correct time calculation for work hours and breaks", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T08:00"
    });
    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T17:30"
    });

    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: "2019-01-10T12:00"
    });
    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: "2019-01-10T13:00"
    });

    expect(getByLabelText("total-time-display").textContent).toBe(
      "8h 30min total"
    );
  });

  it("Disables all buttons when data is saving and enables them when it's finished", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({ type: "START_SAVING_DAY_DATA" });

    expect(getByLabelText("work-start").disabled).toBeTruthy();
    expect(getByLabelText("work-end").disabled).toBeTruthy();
    expect(getByLabelText("break-start").disabled).toBeTruthy();
    expect(getByLabelText("break-end").disabled).toBeTruthy();
    expect(getByLabelText("day-form-save").disabled).toBeTruthy();
    expect(getByLabelText("reset-button").disabled).toBeTruthy();

    store.dispatch({ type: "FINISHED_SAVING_DAY_DATA" });

    expect(getByLabelText("work-start").disabled).not.toBeTruthy();
    expect(getByLabelText("work-end").disabled).toBeTruthy();
    expect(getByLabelText("break-start").disabled).toBeTruthy();
    expect(getByLabelText("break-end").disabled).toBeTruthy();
    expect(getByLabelText("day-form-save").disabled).not.toBeTruthy();
    expect(getByLabelText("reset-button").disabled).not.toBeTruthy();
  });

  it("Disables all buttons when data is loading and enables them when it's finished", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    store.dispatch({ type: "START_FETCHING_DAY_DATA" });

    expect(getByLabelText("work-start").disabled).toBeTruthy();
    expect(getByLabelText("work-end").disabled).toBeTruthy();
    expect(getByLabelText("break-start").disabled).toBeTruthy();
    expect(getByLabelText("break-end").disabled).toBeTruthy();
    expect(getByLabelText("day-form-save").disabled).toBeTruthy();
    expect(getByLabelText("reset-button").disabled).toBeTruthy();

    store.dispatch({ type: "FINISH_FETCHING_DAY_DATA" });

    expect(getByLabelText("work-start").disabled).not.toBeTruthy();
    expect(getByLabelText("work-end").disabled).toBeTruthy();
    expect(getByLabelText("break-start").disabled).toBeTruthy();
    expect(getByLabelText("break-end").disabled).toBeTruthy();
    expect(getByLabelText("day-form-save").disabled).not.toBeTruthy();
    expect(getByLabelText("reset-button").disabled).not.toBeTruthy();
  });

  it("Doesn't display a delete badge on empty date pickers", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(queryByLabelText("delete-badge")).toBeNull();
  });

  it("Deletes the work start field when a delete button next to it is clicked", () => {
    const state = {
      ...initialState,
      today: {
        ...initialState.today,
        hours: [{ start: new Date("2019-01-10T15:00") }]
      }
    };
    const store = createStore(reducer, state, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("work-start").textContent).toBe("15:00");

    fireEvent.click(getByLabelText("delete-badge"));

    expect(getByLabelText("work-start").textContent).toBe("Start");
  });

  it("Doesn't render the side drawer by default", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { queryByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(queryByLabelText("side-drawer")).toBeNull();
  });

  it("Opens the side drawer when the menu button is clicked", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    fireEvent.click(getByLabelText("menu-toggle"));

    expect(getByLabelText("side-drawer")).toBeTruthy();
  });

  it("Enables the workEnd button once workStart data is provided", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("work-end").disabled).toBeTruthy();

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T08:00"
    });

    expect(getByLabelText("work-end").disabled).not.toBeTruthy();
  });

  it("Enables the breakStart button once workStart and workEnd data is provided", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("break-start").disabled).toBeTruthy();

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T14:30"
    });

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T17:30"
    });

    expect(getByLabelText("break-start").disabled).not.toBeTruthy();
  });

  it("Enables the breakEnd button once workStart, workEnd and breakStart data is provided", () => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));
    const { getByLabelText } = renderWithRedux(
      <ConnectedDailyForm fetchDailyData={() => {}} />,
      store
    );

    expect(getByLabelText("break-end").disabled).toBeTruthy();

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: "2019-01-10T14:30"
    });

    store.dispatch({
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: "2019-01-10T17:30"
    });

    store.dispatch({
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: "2019-01-10T12:00"
    });

    expect(getByLabelText("break-end").disabled).not.toBeTruthy();
  });
});
