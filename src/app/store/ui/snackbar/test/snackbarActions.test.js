import { resetSnackbar } from "../actions";

describe("Snackbar actions", () => {
  it("Should return the right object when ran", () => {
    expect(resetSnackbar()).toEqual({ type: "RESET_SNACKBAR" });
  });
});
