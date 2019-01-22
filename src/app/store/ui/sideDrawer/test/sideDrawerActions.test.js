import { toggleDrawer } from "../actions";

describe("Side drawer actions", () => {
  it("Should return a correct object", () => {
    expect(toggleDrawer(true)).toEqual({ type: "TOGGLE_DRAWER", value: true });
  });

  it("Should return a correct object", () => {
    expect(toggleDrawer(false)).toEqual({
      type: "TOGGLE_DRAWER",
      value: false
    });
  });
});
