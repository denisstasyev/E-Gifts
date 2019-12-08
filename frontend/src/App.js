import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Home } from "containers/Home";
import { Gallery } from "containers/Gallery";
import { Filters } from "containers/Filters";
import { Gift } from "containers/Gift";
import { View } from "containers/View";
import { ViewGift } from "containers/ViewGift";
import { Profile } from "containers/Profile";
import { SignUp } from "containers/SignUp";
import { SignIn } from "containers/SignIn";
import { NotFound } from "containers/NotFound";

import { Navigation } from "components/Navigation";

import { SETTINGS_RESIZE, SETTINGS_SET_COLOR_THEME } from "store/actionTypes";

import * as userActionCreators from "store/actions/user";

import {
  COLOR_PRIMARY_MAIN,
  COLOR_SECONDARY_MAIN,
  COLOR_BACKGROUND_DEFAULT_LIGHT,
  COLOR_BACKGROUND_PAPER_LIGHT,
  COLOR_BACKGROUND_WARNING_LIGHT,
  COLOR_BACKGROUND_SUCCESS_LIGHT,
  COLOR_BACKGROUND_DEFAULT_DARK,
  COLOR_BACKGROUND_PAPER_DARK,
  COLOR_BACKGROUND_WARNING_DARK,
  COLOR_BACKGROUND_SUCCESS_DARK,
  COLOR_TEXT_PRIMARY_DARK,
  COLOR_TEXT_SECONDARY_DARK
} from "configs/CSSvariables";

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY_MAIN
    },
    secondary: {
      main: COLOR_SECONDARY_MAIN
    },
    background: {
      default: COLOR_BACKGROUND_DEFAULT_LIGHT,
      paper: COLOR_BACKGROUND_PAPER_LIGHT,
      warning: COLOR_BACKGROUND_WARNING_LIGHT,
      success: COLOR_BACKGROUND_SUCCESS_LIGHT
    }
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 600
  }
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY_MAIN
    },
    secondary: {
      main: COLOR_SECONDARY_MAIN
    },
    background: {
      default: COLOR_BACKGROUND_DEFAULT_DARK,
      paper: COLOR_BACKGROUND_PAPER_DARK,
      warning: COLOR_BACKGROUND_WARNING_DARK,
      success: COLOR_BACKGROUND_SUCCESS_DARK
    },
    text: {
      primary: COLOR_TEXT_PRIMARY_DARK,
      secondary: COLOR_TEXT_SECONDARY_DARK
    }
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 600
  }
});

const App = props => {
  props.handleAuthCheck();
  props.handleResize();

  let colorTheme = localStorage.getItem("colorTheme");
  if (colorTheme === "dark") {
    props.setColorTheme(colorTheme);
  }

  let vh =
    ((document &&
      document.documentElement &&
      document.documentElement.clientHeight) ||
      window.innerHeight) * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh =
      ((document &&
        document.documentElement &&
        document.documentElement.clientHeight) ||
        window.innerHeight) * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    props.handleResize();
  });

  return (
    <BrowserRouter>
      <MuiThemeProvider
        theme={props.colorTheme === "light" ? lightTheme : darkTheme}
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route exact path="/gallery" component={Gallery} />
          <Route path="/gallery/filters" component={Filters} />
          <Route path="/gallery/gift/:id" component={Gift} />
          <Route exact path="/view" component={View} />
          <Route path="/view/:id" component={ViewGift} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/signup" component={SignUp} />
          <Route path="/profile/signin" component={SignIn} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Navigation />
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  colorTheme: state.settingsReducer.colorTheme
});

const mapDispatchToProps = dispatch => ({
  handleAuthCheck: () => dispatch(userActionCreators.authCheck()),
  handleResize: () =>
    dispatch({ type: SETTINGS_RESIZE, width: window.innerWidth }),
  setColorTheme: colorTheme =>
    dispatch({ type: SETTINGS_SET_COLOR_THEME, colorTheme })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
