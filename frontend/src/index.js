import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "index.css";

import SentryErrorLogger from "SentryErrorLogger";
import App from "App";

import navigationReducer from "store/reducers/navigation";
import userReducer from "store/reducers/user";
import filtersReducer from "store/reducers/filters";
import galleryReducer from "store/reducers/gallery";
import giftReducer from "store/reducers/gift";
import settingsReducer from "store/reducers/settings";

const rootReducer = combineReducers({
  navigationReducer,
  userReducer,
  filtersReducer,
  galleryReducer,
  giftReducer,
  settingsReducer
});

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    {process.env.NODE_ENV === "production" ? <SentryErrorLogger /> : <App />}
  </Provider>,
  document.getElementById("root")
);
