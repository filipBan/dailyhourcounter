import React, { Suspense } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import thunk from "redux-thunk";

import DailyForm from "./container";
import reducer from "../../../store/reducers";

const initialState = {
  today: {
    today: new Date("2019-01-10T16:00"),
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
  },
  auth: {},
  ui: {},
  reports: {},
  settings: {}
};

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

it("Can render with redux with defaults", () => {
  const store = createStore(reducer, initialState);
  renderWithRedux(<DailyForm />, store);
});

it("Has correct start values in the select buttons", () => {
  const store = createStore(reducer, initialState);
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  expect(getByLabelText("work-start").textContent).toBe("Start");
  expect(getByLabelText("work-end").textContent).toBe("End");
  expect(getByLabelText("break-start").textContent).toBe("Start");
  expect(getByLabelText("work-end").textContent).toBe("End");
});

it("Has correct default date displayed in the top controls", () => {
  const store = createStore(reducer, initialState);
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  expect(getByLabelText("top-controls").textContent).toBe(
    "Thursday 10th Jan 2019"
  );
});

it("Displays a correct date when forward button is clicked in top controls", () => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  fireEvent.click(getByLabelText("date-forward"));

  expect(getByLabelText("top-controls").textContent).toBe(
    "Friday 11th Jan 2019"
  );
});

it("Displays a correct date when back button is clicked in top controls", () => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  fireEvent.click(getByLabelText("date-back"));

  expect(getByLabelText("top-controls").textContent).toBe(
    "Wednesday 9th Jan 2019"
  );
});

it("Displays a correct error message when trying to save with no data", () => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "You need to provide work start and end times to save."
  );
});

it("Displays correct work start time when a date is changed", () => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

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
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

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
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

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
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

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
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  expect(getByLabelText("work-end").disabled).toBeTruthy();
  expect(getByLabelText("break-start").disabled).toBeTruthy();
  expect(getByLabelText("break-end").disabled).toBeTruthy();
});

// =============================================
// Input error handling
// =============================================

it("Displays a correct error when trying to save with only work start provided", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T16:00"),
          end: null
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);

  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "You need to provide work start and end times to save."
  );
});

it("Displays a correct error when trying to save with work start, end and break start", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T10:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T11:00"),
          end: null
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "You need to provide both break start and end times to save them."
  );
});

it("Displays a correct error when trying to save with workStart > workEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T12:00"),
          end: new Date("2019-01-10T10:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Work can't end before it started. If you worked overnight remember to also change the day."
  );
});

it("Displays a correct error when trying to save with breakStart < workStart", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T17:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T09:00"),
          end: new Date("2019-01-10T12:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break can't start before work start."
  );
});

it("Displays a correct error when trying to save with breakStart > workEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T17:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T18:00"),
          end: new Date("2019-01-10T12:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break can't start after works' end."
  );
});

it("Displays a correct error when trying to save with breakStart > breakEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T17:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T13:00"),
          end: new Date("2019-01-10T12:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break can't start after it ended."
  );
});

it("Displays a correct error when trying to save with breakEnd > workEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T17:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T11:00"),
          end: new Date("2019-01-10T18:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break can't finish after works' end."
  );
});

it("Displays a correct error when trying to save with workStart === workEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T10:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Work start and end can't be the same."
  );
});

it("Displays a correct error when trying to save with breakStart === breakEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T19:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T12:00"),
          end: new Date("2019-01-10T12:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break start and end can't be the same."
  );
});

it("Displays a correct error when trying to save with breakStart === breakEnd", () => {
  const state = {
    ...initialState,
    today: {
      ...initialState.today,
      hours: [
        {
          start: new Date("2019-01-10T10:00"),
          end: new Date("2019-01-10T19:00")
        }
      ],
      breaks: [
        {
          start: new Date("2019-01-10T12:00"),
          end: new Date("2019-01-10T12:00")
        }
      ]
    }
  };
  const store = createStore(reducer, state, applyMiddleware(thunk));
  const { getByLabelText } = renderWithRedux(<DailyForm />, store);
  fireEvent.click(getByLabelText("day-form-save"));

  expect(getByLabelText("snackbar").textContent).toBe(
    "Break start and end can't be the same."
  );
});
