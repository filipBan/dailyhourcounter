import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/modules/App";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./app/store";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: blue["500"]
      }
    },
    MuiPickersDay: {
      day: {
        color: "#000"
      },
      selected: {
        backgroundColor: blue["500"]
      },
      current: {
        color: blue["500"]
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: blue["500"]
      }
    }
  },
  palette: {
    primary: blue,
    secondary: green
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
