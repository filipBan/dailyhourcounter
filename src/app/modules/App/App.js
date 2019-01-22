import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import firebase from "../../../firebaseConfig";
import Snackbar from "../../components/Snackbar";

const DailyForm = React.lazy(() => import("../Screens/DailyForm"));
const LoginPage = React.lazy(() => import("../Screens/LoginPage"));
const RegisterPage = React.lazy(() => import("../Screens/RegisterPage"));
const ReportScreen = React.lazy(() => import("../Screens/ReportScreen"));
// const SettingsScreen = React.lazy(() => import("../Screens/SettingsScreen"));
const VerifyPage = React.lazy(() => import("../Screens/VerifyPage"));

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

const CheckAuthState = ({ checkingAuthState, isLoggedIn }) => {
  if (!checkingAuthState && isLoggedIn) {
    return <Redirect to="/today" />;
  }

  if (!checkingAuthState && !isLoggedIn) {
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
    const { checkNotifications, saveLoggedUserSession } = this.props;
    window.addEventListener("updates-available", e => {
      this.props.notifyAboutUpdates();
    });

    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        saveLoggedUserSession(user);
        checkNotifications(user.uid);
      } else {
        saveLoggedUserSession(null);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    const { isLoggedIn, emailVerified, checkingAuthState } = this.props;
    const canIAccessIt = isLoggedIn ? (emailVerified ? true : false) : false;

    const redirectPath = isLoggedIn
      ? emailVerified
        ? "/"
        : "/verify-email"
      : "/";

    return (
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <CheckAuthState
                    checkingAuthState={checkingAuthState}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
              <Route path="/login" render={() => <LoginPage />} />
              <Route path="/register" render={() => <RegisterPage />} />
              <PrivateRoute
                path="/today"
                component={DailyForm}
                canIAccessIt={canIAccessIt}
                redirectPath={redirectPath}
              />
              <PrivateRoute
                path="/reports"
                component={ReportScreen}
                canIAccessIt={canIAccessIt}
                redirectPath={redirectPath}
              />
              {/* <PrivateRoute
                path="/settings"
                component={SettingsScreen}
                canIAccessIt={canIAccessIt}
                redirectPath={redirectPath}
              /> */}
              <Route path="/verify-email" component={VerifyPage} />
            </Switch>
          </Suspense>
          <Snackbar />
        </div>
      </Router>
    );
  }
}

export default App;
