import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "index.css";

import SentryErrorLogger from "SentryErrorLogger";

import userReducer from "store/reducers/user";
import filtersReducer from "store/reducers/filters";
import galleryReducer from "store/reducers/gallery";
import giftReducer from "store/reducers/gift";
// import * as serviceWorker from "./unused/serviceWorker";

const rootReducer = combineReducers({
  userReducer,
  filtersReducer,
  galleryReducer,
  giftReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <SentryErrorLogger />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
