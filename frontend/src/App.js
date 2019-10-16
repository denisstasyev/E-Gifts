import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Home from "containers/Home";
import Gallery from "containers/Gallery";
import View from "containers/View";
import Profile from "containers/Profile";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";

import LabelBottomNavigation from "components/LabelBottomNavigation";

import * as userActionCreators from "store/actions/user";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#2d53fe",
      dark: "#000"
    },
    secondary: {
      main: "#f44336"
    }
  }
});

const App = props => {
  props.handleAuthCheck();

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/view" component={View} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/signup" component={SignUp} />
          <Route path="/profile/signin" component={SignIn} />
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
