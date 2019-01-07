import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Loadable from "react-loadable";

import SideDrawer from "../../components/SideDrawer";

import firebase from "../../../firebaseConfig";

import "./style.css";

const DailyFormAsync = Loadable({
  loader: () => import("../DailyForm"),
  loading: () => <div>Loading...</div>
});

const LoginPageAsync = Loadable({
  loader: () => import("../LoginPage"),
  loading: () => <div>Loading...</div>
});

const RegisterPageAsync = Loadable({
  loader: () => import("../RegisterPage"),
  loading: () => <div>Loading...</div>
});

const ReportScreenAsync = Loadable({
  loader: () => import("../ReportScreen"),
  loading: () => <div>Loading...</div>
});

const SettingsScreenAsync = Loadable({
  loader: () => import("../SettingsScreen"),
  loading: () => <div>Loading...</div>
});

const VerifyPageAsync = Loadable({
  loader: () => import("../VerifyPage"),
  loading: () => <div>Loading...</div>
});

function PrivateRoute({
  path,
  canIAccessIt,
  redirectPath,
  component: Component
}) {
  return (
    <Route
      path={path}
      render={props =>
        canIAccessIt ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    />
  );
}

const CheckAuthState = props => {
  if (!props.checkingAuthState && props.isLoggedIn) {
    return <Redirect to="/today" />;
  }

  if (!props.checkingAuthState && !props.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return null;
};

class App extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.saveLoggedUserSession(user);
      } else {
        console.log("No user/Logged out");
        this.props.saveLoggedUserSession(null);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    const { isLoggedIn, emailVerified } = this.props.auth;
    const canIAccessIt = isLoggedIn ? (emailVerified ? true : false) : false;

    const redirectPath = isLoggedIn ? (emailVerified ? "/" : "/error") : "/";

    return (
      <Router>
        <div className="main-app">
          <SideDrawer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <CheckAuthState {...this.props.auth} />}
            />
            <Route path="/login" component={LoginPageAsync} />
            <Route path="/register" component={RegisterPageAsync} />
            <PrivateRoute
              path="/today"
              component={DailyFormAsync}
              canIAccessIt={canIAccessIt}
              redirectPath={redirectPath}
            />
            <PrivateRoute
              path="/reports"
              component={ReportScreenAsync}
              canIAccessIt={canIAccessIt}
              redirectPath={redirectPath}
            />
            <PrivateRoute
              path="/settings"
              component={SettingsScreenAsync}
              canIAccessIt={canIAccessIt}
              redirectPath={redirectPath}
            />
            <Route
              path="/error"
              render={props => {
                const allProps = {
                  ...props,
                  ...this.props.auth,
                  logoutUser: this.props.logoutUser
                };
                return <VerifyPageAsync {...allProps} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
