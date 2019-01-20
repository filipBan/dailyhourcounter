import authReducer from "../reducer";

const initialState = {
  isLoggedIn: false,
  name: "",
  uid: "",
  email: "",
  wages: 0,
  loading: false,
  emailVerified: false,
  checkingAuthState: true,
  login: {
    email: "",
    password: ""
  },
  register: {}
};

describe("Auth reducer", () => {
  it("Should return the initial state by default", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle AUTH_SUCCESS", () => {
    const action = {
      type: "AUTH_SUCCESS",
      payload: {
        isLoggedIn: true,
        emailVerified: true,
        email: "test@test.com",
        uid: "123123123",
        loading: false,
        checkingAuthState: false
      }
    };
    expect(authReducer(undefined, action)).toEqual({
      ...initialState,
      isLoggedIn: true,
      emailVerified: true,
      email: "test@test.com",
      uid: "123123123",
      loading: false,
      checkingAuthState: false
    });
  });

  it("Should handle AUTH_FAIL", () => {
    const action = {
      type: "AUTH_FAIL"
    };
    expect(authReducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false
    });
  });

  it("Should handle AUTH_LOGOUT", () => {
    const action = {
      type: "AUTH_LOGOUT"
    };
    expect(
      authReducer({ ...initialState, checkingAuthState: true }, action)
    ).toEqual({
      ...initialState,
      checkingAuthState: false
    });
  });

  it("Should handle AUTH_START", () => {
    const action = {
      type: "AUTH_START"
    };
    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it("Should handle AUTH_END", () => {
    const action = {
      type: "AUTH_END"
    };
    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      checkingAuthState: false
    });
  });

  it("Should handle UPDATE_INPUT - login email", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "login",
        field: "email",
        value: "test@test.com"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        email: "test@test.com"
      }
    });
  });

  it("Should handle UPDATE_INPUT - login password", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "login",
        field: "password",
        value: "testPassword123"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        password: "testPassword123"
      }
    });
  });

  it("Should handle UPDATE_INPUT - register userName", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "register",
        field: "userName",
        value: "TestUser"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        userName: "TestUser"
      }
    });
  });

  it("Should handle UPDATE_INPUT - register wages", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "register",
        field: "wages",
        value: 123
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        wages: 123
      }
    });
  });

  it("Should handle UPDATE_INPUT - register email", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "register",
        field: "email",
        value: "test@test.com"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        email: "test@test.com"
      }
    });
  });

  it("Should handle UPDATE_INPUT - register password", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "register",
        field: "password",
        value: "testPassword123"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        password: "testPassword123"
      }
    });
  });

  it("Should handle UPDATE_INPUT - register confirm password", () => {
    const action = {
      type: "UPDATE_INPUT",
      payload: {
        screen: "register",
        field: "confirmPassword",
        value: "testPassword123"
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        confirmPassword: "testPassword123"
      }
    });
  });

  it("Should handle UPDATE_USER_DATA", () => {
    const action = {
      type: "UPDATE_USER_DATA",
      user: {
        userName: "Tester",
        wages: 12
      }
    };

    expect(authReducer({ ...initialState }, action)).toEqual({
      ...initialState,
      name: "Tester",
      wages: 12
    });
  });

  it("Should handle REGISTRATION_COMPLETE", () => {
    const action = { type: "REGISTRATION_COMPLETE" };

    expect(
      authReducer({ ...initialState, checkingAuthState: true }, action)
    ).toEqual({
      ...initialState,
      checkingAuthState: false
    });
  });

  it("Should handle REPLACE_DAY_DATA when wages are NOT provided", () => {
    const action = {
      type: "REPLACE_DAY_DATA",
      payload: {
        wages: 0
      }
    };

    expect(authReducer({ ...initialState, wages: 10 }, action)).toEqual({
      ...initialState,
      wages: 10
    });
  });

  it("Should handle REPLACE_DAY_DATA when wages are provided", () => {
    const action = {
      type: "REPLACE_DAY_DATA",
      payload: {
        wages: 10
      }
    };

    expect(authReducer({ ...initialState, wages: 0 }, action)).toEqual({
      ...initialState,
      wages: 10
    });
  });

  it("Should handle UPDATE_WAGES", () => {
    const action = {
      type: "UPDATE_WAGES",
      wages: 10
    };

    expect(authReducer({ ...initialState, wages: 0 }, action)).toEqual({
      ...initialState,
      wages: 10
    });
  });
});
