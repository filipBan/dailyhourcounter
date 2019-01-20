import reducer from "./reducer";

const initialState = {
  reportStartDate: null,
  reportEndDate: null,
  reportData: null,
  fetching: false
};

describe("Reports reducer", () => {
  it("Should return initial state by defualt", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle CLEAR_REPORT_DATA", () => {
    const action = { type: "CLEAR_REPORT_DATA" };
    expect(
      reducer(
        {
          reportStartDate: "2000-10-10",
          reportEndDate: "2000-10-20",
          reportData: []
        },
        action
      )
    ).toEqual(initialState);
  });

  it("Should handle ERROR_FETCHING_REPORT_DATA", () => {
    const action = { type: "ERROR_FETCHING_REPORT_DATA" };
    expect(reducer({ ...initialState, fetching: true }, action)).toEqual({
      ...initialState,
      fetching: false
    });
  });

  it("Should handle START_FETCHING_REPORT_DATA", () => {
    const action = { type: "START_FETCHING_REPORT_DATA" };
    expect(reducer({ ...initialState }, action)).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("Should handle UPDATE_REPORT_START_DATE", () => {
    const action = { type: "UPDATE_REPORT_START_DATE", date: "2000-10-11" };
    expect(reducer({ ...initialState }, action)).toEqual({
      ...initialState,
      reportStartDate: "2000-10-11"
    });
  });

  it("Should handle UPDATE_REPORT_END_DATE", () => {
    const action = { type: "UPDATE_REPORT_END_DATE", date: "2000-10-21" };
    expect(reducer({ ...initialState }, action)).toEqual({
      ...initialState,
      reportEndDate: "2000-10-21"
    });
  });

  it("Should handle UPDATE_REPORT_DATA", () => {
    const action = {
      type: "UPDATE_REPORT_DATA",
      data: ["Dummy", "Data", "Array"]
    };
    expect(reducer({ ...initialState }, action)).toEqual({
      ...initialState,
      reportData: ["Dummy", "Data", "Array"],
      fetching: false
    });
  });
});
