import reducer from "../reducer";

const initialState = {
  visible: false
};

describe("Side Drawer reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle TOGGLE_DRAWER - drawer off", () => {
    const action = { type: "TOGGLE_DRAWER", value: true };
    expect(reducer(initialState, action)).toEqual({
      visible: true
    });
  });

  it("Should handle TOGGLE_DRAWER - drawer on", () => {
    const action = { type: "TOGGLE_DRAWER", value: false };
    expect(reducer({ ...initialState, visible: true }, action)).toEqual({
      visible: false
    });
  });
});
