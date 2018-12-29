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
  typography: {
    body1: {
      fontSize: "1.6rem"
    },
    button: {
      fontSize: "1.6rem"
    }
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: blue["500"]
      }
    },
    MuiPickersDay: {
      day: {
        color: "#000",
        fontSize: "1.2rem"
      },
      selected: {
        backgroundColor: blue["500"]
      },
      current: {
        color: blue["500"]
      }
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        fontSize: "1.4rem"
      },
      switchHeader: {
        fontSize: "1.4rem"
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
