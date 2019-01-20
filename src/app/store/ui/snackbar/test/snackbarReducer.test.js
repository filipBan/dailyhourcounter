import reducer from "../reducer";

const initialState = {
  message: "",
  type: ""
};

describe("Snackbar reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle RESET_SNACKBAR", () => {
    const action = { type: "RESET_SNACKBAR" };
    expect(reducer({ message: "Hello", type: "error" }, action)).toEqual(
      initialState
    );
  });

  it("Should handle ERROR_SAVING_DAY_DATA", () => {
    const action = {
      type: "ERROR_SAVING_DAY_DATA",
      error: "Test error"
    };
    expect(reducer(initialState, action)).toEqual({
      type: "error",
      message: "Test error"
    });
  });

  it("Should handle AUTH_FAIL", () => {
    const action = {
      type: "AUTH_FAIL",
      error: "Test error"
    };
    expect(reducer(initialState, action)).toEqual({
      type: "error",
      message: "Test error"
    });
  });

  it("Should handle ERROR_FETCHING_DAY_DATA", () => {
    const action = {
      type: "ERROR_FETCHING_DAY_DATA",
      error: "Test error"
    };
    expect(reducer(initialState, action)).toEqual({
      type: "error",
      message: "Test error"
    });
  });

  it("Should handle CLEAR_AUTH_ERROR", () => {
    const action = { type: "CLEAR_AUTH_ERROR" };
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
