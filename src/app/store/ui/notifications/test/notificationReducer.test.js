import reducer from "../reducer";

const initialState = {
  notification: {},
  modalOpen: false
};

describe("Notification reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle CLOSE_NOTIFICATIONS_MODAL", () => {
    const action = { type: "CLOSE_NOTIFICATIONS_MODAL" };
    expect(reducer({ ...initialState, modalOpen: true }, action)).toEqual(
      initialState
    );
  });

  it("Should handle SAVE_UNREAD_NOTIFICATION", () => {
    const action = {
      type: "SAVE_UNREAD_NOTIFICATION",
      notification: { title: "Hello" }
    };
    expect(reducer(initialState, action)).toEqual({
      modalOpen: true,
      notification: {
        title: "Hello"
      }
    });
  });
});
