import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SideDrawer from "../SideDrawer";
import TopBar from "../TopBar";

import DailyForm from "../DailyForm";
import LoginPage from "../LoginPage";
import ReportScreen from "../ReportScreen";
import SettingsScreen from "../SettingsScreen";
import firebase from "../../../firebaseConfig";

import "./style.css";

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
            <Route exact path="/" component={LoginPage} />
            <Route path="/today" component={DailyForm} />
            <Route path="/reports" component={ReportScreen} />
            <Route path="/settings" component={SettingsScreen} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
