import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

let middleware = [thunk];

middleware = [...middleware, logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleware = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, middleware);

export default store;
