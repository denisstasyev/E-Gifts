import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Home } from "containers/Home";
import Gallery from "containers/Gallery";
import Filters from "containers/Filters";
import Gift from "containers/Gift";
import View from "containers/View";
import Profile from "containers/Profile";
import NotFound from "containers/NotFound";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";

import LabelBottomNavigation from "components/LabelBottomNavigation";

import * as userActionCreators from "store/actions/user";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fff",
      paper: "#f3f3f3"
    },
    primary: {
      main: "#2d53fe"
    },
    secondary: {
      main: "#00ff39"
    }
  }
});

const App = props => {
  props.handleAuthCheck();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
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
          <Route path="/view" component={View} />
          <Route path="/view/:id" component={View} />
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
