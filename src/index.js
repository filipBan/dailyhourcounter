import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/modules/App";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./app/store";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
