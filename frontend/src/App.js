import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Home } from "containers/Home";
import Gallery from "containers/Gallery";
import Filters from "containers/Filters";
import Gift from "containers/Gift";
import { View } from "containers/View";
import { ViewGift } from "containers/ViewGift";
import { Profile } from "containers/Profile";
import SignUp from "containers/SignUp";
import { SignIn } from "containers/SignIn";
import { NotFound } from "containers/NotFound";

import { LabelBottomNavigation } from "components/LabelBottomNavigation";

import * as userActionCreators from "store/actions/user";

import {
  COLOR_BACKGROUND_DEFAULT_LIGHT,
  COLOR_BACKGROUND_PAPER_LIGHT,
  COLOR_BACKGROUND_WARNING_LIGHT,
  COROL_PRIMARY_MAIN,
  COROL_SECONDARY_MAIN
} from "configs/CSSvariables";

const theme = createMuiTheme({
  palette: {
    background: {
      default: COLOR_BACKGROUND_DEFAULT_LIGHT,
      paper: COLOR_BACKGROUND_PAPER_LIGHT,
      warning: COLOR_BACKGROUND_WARNING_LIGHT
    },
    primary: {
      main: COROL_PRIMARY_MAIN
    },
    secondary: {
      main: COROL_SECONDARY_MAIN
    }
  }
});

const App = props => {
  props.handleAuthCheck();

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
  });

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
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
        <LabelBottomNavigation />
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  handleAuthCheck: () => dispatch(userActionCreators.authCheck())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
