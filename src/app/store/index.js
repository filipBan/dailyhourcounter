import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let middleware = [thunk];

middleware = [...middleware];

if (process.env.NODE_ENV !== "production") {
  const logger = require("redux-logger").createLogger();

  middleware = [...middleware, logger];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  middleware = composeEnhancers(applyMiddleware(...middleware));
} else {
  middleware = applyMiddleware(...middleware);
}

const store = createStore(reducers, middleware);

export default store;
