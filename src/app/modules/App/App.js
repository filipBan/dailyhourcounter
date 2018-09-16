import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import SideDrawer from "../SideDrawer";
import TopBar from "../TopBar";

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

const ReportScreenAsync = Loadable({
  loader: () => import("../ReportScreen"),
  loading: () => <div>Loading...</div>
});

const SettingsScreenAsync = Loadable({
  loader: () => import("../SettingsScreen"),
  loading: () => <div>Loading...</div>
});

// const TopBarAsync
class App extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
  }

  async componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.saveLoggedUserSession(user);
      } else {
        console.log("No user/Logged out");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  changeCalendarDate = date => {
    const { toggleCalendar, handleCalendarChange } = this.props;
    handleCalendarChange(date);
    toggleCalendar();
  };

  render() {
    const { calendarVisible, toggleDrawer, toggleCalendar } = this.props;
    return (
      <Router>
        <div className="main-app">
          <SideDrawer />
          <TopBar
            calendarVisible={calendarVisible}
            toggleDrawer={toggleDrawer}
            toggleCalendar={toggleCalendar}
            changeCalendarDate={this.changeCalendarDate}
          />
          <Switch>
            <Route exact path="/" component={LoginPageAsync} />
            <Route path="/today" component={DailyFormAsync} />
            <Route path="/reports" component={ReportScreenAsync} />
            <Route path="/settings" component={SettingsScreenAsync} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
