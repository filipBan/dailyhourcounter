import React, { Suspense } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render, fireEvent, cleanup } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import thunk from "redux-thunk";

import RegisterPage from "./RegisterPage";
import reducer from "../../../store/reducers";
import {
  clearAuthErrors,
  registerNewAccount,
  updateInput,
  authError
} from "../../../store/auth/actions";

const initialState = Object.freeze({
  today: {},
  auth: {
    isLoggedIn: false,
    name: "",
    uid: "",
    wages: 0,
    loading: false,
    error: null,
    emailVerified: false,
    checkingAuthState: true,
    login: {
      email: "",
      password: ""
    },
    register: {}
  },
  ui: {
    notification: {
      modalOpen: false,
      notification: {}
    },
    sideDrawer: {
      visible: false
    }
  },
  reports: {},
  settings: {}
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loading: state.auth.loading,
  error: state.auth.error,
  email: state.auth.register.email,
  password: state.auth.register.password,
  confirmPassword: state.auth.register.confirmPassword,
  userName: state.auth.register.userName,
  wages: state.auth.register.wages
});

const mapDispatchToProps = dispatch => ({
  registerNewAccount: props => dispatch(registerNewAccount(props)),
  clearAuthErrors: () => dispatch(clearAuthErrors()),
  updateInput: (field, value) =>
    dispatch(updateInput("register", field, value)),
  authError: error => dispatch(authError(error))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

const ConnectedRegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RegisterPage);

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

describe("Registration Page integration tests", () => {
  it("Can render with redux with defaults", () => {
    const store = createStore(reducer, initialState);
    renderWithRedux(<ConnectedRegisterPage />, store);
  });

  it("Should match the snapshot", () => {
    const store = createStore(reducer, initialState);
    const { container } = renderWithRedux(<ConnectedRegisterPage />, store);

    expect(container).toMatchSnapshot();
  });

  it("Should not allow to submit the form without filling out all required fields", () => {
    const store = createStore(reducer, initialState);
    const registerNewAccountMock = jest.fn();
    const { getByLabelText } = renderWithRedux(
      <ConnectedRegisterPage registerNewAccount={registerNewAccountMock} />,
      store
    );

    fireEvent.click(getByLabelText("register-submit-button"));

    expect(registerNewAccountMock).not.toHaveBeenCalled();
  });
});
