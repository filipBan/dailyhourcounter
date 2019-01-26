import reducer from "../reducer";

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

describe("Today Reducer", () => {
  it("Should return the initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle START_SAVING_DAY_DATA", () => {
    const action = { type: "START_SAVING_DAY_DATA" };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      savingData: true
    });
  });

  it("Should handle FINISHED_SAVING_DAY_DATA", () => {
    const action = { type: "FINISHED_SAVING_DAY_DATA" };
    expect(reducer({ ...initialState, savingData: true }, action)).toEqual({
      ...initialState,
      savingData: false
    });
  });

  it("Should handle START_FETCHING_DAY_DATA", () => {
    const action = { type: "START_FETCHING_DAY_DATA" };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loadingData: true
    });
  });

  it("Should handle FINISH_FETCHING_DAY_DATA", () => {
    const action = { type: "FINISH_FETCHING_DAY_DATA" };
    expect(reducer({ ...initialState, loadingData: true }, action)).toEqual({
      ...initialState,
      loadingData: false
    });
  });

  it("Should handle ERROR_SAVING_DAY_DATA", () => {
    const action = { type: "ERROR_SAVING_DAY_DATA" };
    expect(reducer({ ...initialState, savingData: true }, action)).toEqual({
      ...initialState,
      savingData: false
    });
  });

  it("Should handle ERROR_FETCHING_DAY_DATA", () => {
    const action = { type: "ERROR_FETCHING_DAY_DATA" };
    expect(reducer({ ...initialState, loadingData: true }, action)).toEqual({
      ...initialState,
      loadingData: false
    });
  });

  it("Should handle UPDATE_BREAKS - break start, no other time provided", () => {
    const action = {
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      breaks: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: null
        }
      ]
    });
  });

  it("Should handle UPDATE_BREAKS - break start, breakEnd provided", () => {
    const action = {
      type: "UPDATE_BREAKS",
      timeType: "breakStart",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: null, end: new Date("2019-01-10T17:00Z") }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      breakMinutes: 60,
      breaks: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: new Date("2019-01-10T17:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_BREAKS - breakEnd, no other times provided", () => {
    const action = {
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: new Date("2019-01-10T17:00Z")
    };
    expect(
      reducer(
        {
          ...initialState
        },
        action
      )
    ).toEqual({
      ...initialState,
      breaks: [
        {
          start: null,
          end: new Date("2019-01-10T17:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_BREAKS - breakEnd, breakStart provided", () => {
    const action = {
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: new Date("2019-01-10T17:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: new Date("2019-01-10T16:00Z"), end: null }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      breakMinutes: 60,
      breaks: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: new Date("2019-01-10T17:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_BREAKS - breakStart > breakEnd", () => {
    const action = {
      type: "UPDATE_BREAKS",
      timeType: "breakEnd",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: new Date("2019-01-10T17:00Z"), end: null }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      breakMinutes: 0,
      breaks: [
        {
          start: new Date("2019-01-10T17:00Z"),
          end: new Date("2019-01-10T16:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_HOURS, workStart, no other times", () => {
    const action = {
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(
      reducer(
        {
          ...initialState
        },
        action
      )
    ).toEqual({
      ...initialState,
      hours: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: null
        }
      ]
    });
  });

  it("Should handle UPDATE_HOURS, workEnd, no other times", () => {
    const action = {
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(
      reducer(
        {
          ...initialState
        },
        action
      )
    ).toEqual({
      ...initialState,
      hours: [
        {
          start: null,
          end: new Date("2019-01-10T16:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_HOURS, workStart - workEnd provided", () => {
    const action = {
      type: "UPDATE_HOURS",
      timeType: "workStart",
      amount: new Date("2019-01-10T16:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          hours: [{ start: null, end: new Date("2019-01-10T20:00Z") }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      workedMinutes: 240,
      hours: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: new Date("2019-01-10T20:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_HOURS, workEnd - workStart provided", () => {
    const action = {
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: new Date("2019-01-10T20:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          hours: [{ start: new Date("2019-01-10T16:00Z"), end: null }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      workedMinutes: 240,
      hours: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: new Date("2019-01-10T20:00Z")
        }
      ]
    });
  });

  it("Should handle UPDATE_HOURS, workStart > workEnd", () => {
    const action = {
      type: "UPDATE_HOURS",
      timeType: "workEnd",
      amount: new Date("2019-01-10T10:00Z")
    };
    expect(
      reducer(
        {
          ...initialState,
          hours: [{ start: new Date("2019-01-10T16:00Z"), end: null }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      workedMinutes: 0,
      hours: [
        {
          start: new Date("2019-01-10T16:00Z"),
          end: new Date("2019-01-10T10:00Z")
        }
      ]
    });
  });

  it("Should handle SET_TODAY_DATE", () => {
    const action = {
      type: "SET_TODAY_DATE",
      date: new Date("2019-01-10T16:00Z")
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      today: new Date("2019-01-10T16:00Z")
    });
  });

  it("Should handle SET_TODAY_DATE - return current date if a falsy value passed", () => {
    const action = {
      type: "SET_TODAY_DATE",
      date: ""
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState
    });
  });

  // it("Should handle SET_TODAY_DATE - return current date if an invalid value is passed", () => {
  //   const action = {
  //     type: "SET_TODAY_DATE",
  //     date: "Hello"
  //   };
  //   expect(reducer(initialState, action)).toEqual({
  //     ...initialState
  //   });
  // });

  it("Should handle CLEAR_ALL_TIMES", () => {
    const action = {
      type: "CLEAR_ALL_TIMES"
    };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: "2000-10-10", end: "2000-10-11" }],
          hours: [{ start: "2000-10-10", end: "2000-10-11" }]
        },
        action
      )
    ).toEqual(initialState);
  });

  it("Should handle REPLACE_DAY_DATA", () => {
    const action = {
      type: "REPLACE_DAY_DATA",
      payload: {
        breaks: [{ start: "2001-10-05", end: "2001-10-06" }],
        hours: [{ start: "2001-10-05", end: "2001-10-06" }]
      }
    };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: "2000-10-10", end: "2000-10-11" }],
          hours: [{ start: "2000-10-10", end: "2000-10-11" }]
        },
        action
      )
    ).toEqual({
      ...initialState,
      breaks: [{ start: "2001-10-05", end: "2001-10-06" }],
      hours: [{ start: "2001-10-05", end: "2001-10-06" }]
    });
  });

  it("Should handle RESET_DAY_DATA", () => {
    const action = { type: "RESET_DAY_DATA" };
    expect(
      reducer(
        {
          ...initialState,
          breaks: [{ start: "2000-10-10", end: "2000-10-11" }],
          hours: [{ start: "2000-10-10", end: "2000-10-11" }]
        },
        action
      )
    ).toEqual(initialState);
  });
});
