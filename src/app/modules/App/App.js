import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import firebase from "../../../firebaseConfig";

const SideDrawer = React.lazy(() => import("../../components/SideDrawer"));
const DailyForm = React.lazy(() => import("../Screens/DailyForm"));
const LoginPage = React.lazy(() => import("../Screens/LoginPage"));
const RegisterPage = React.lazy(() => import("../Screens/RegisterPage"));
const ReportScreen = React.lazy(() => import("../Screens/ReportScreen"));
const SettingsScreen = React.lazy(() => import("../Screens/SettingsScreen"));
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
    const { checkNotifications, saveLoggedUserSession } = this.props;

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
    const { isLoggedIn, emailVerified } = this.props.auth;
    const canIAccessIt = isLoggedIn ? (emailVerified ? true : false) : false;

    const redirectPath = isLoggedIn ? (emailVerified ? "/" : "/error") : "/";

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
            <SideDrawer />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <CheckAuthState {...this.props.auth} />}
              />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
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
              <PrivateRoute
                path="/settings"
                component={SettingsScreen}
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
                  return <VerifyPage {...allProps} />;
                }}
              />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
