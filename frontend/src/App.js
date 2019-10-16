import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Home from "containers/Home";
import Gallery from "containers/Gallery";
import Camera from "containers/Camera";
import Account from "containers/Account";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";

import LabelBottomNavigation from "components/LabelBottomNavigation";

import { USER_AUTH_SUCCESS } from "store/actionTypes";

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
  let data = {};
  data.username = localStorage.getItem("username");
  data.token = localStorage.getItem("token");
  if (data.username && data.token) {
    data.firstName = localStorage.getItem("firstName");
    data.lastName = localStorage.getItem("lastName");
    data.mail = localStorage.getItem("mail");
    props.handleAuthSuccess(data);
  }

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/camera" component={Camera} />
          <Route exact path="/account" component={Account} />
          <Route path="/account/signup" component={SignUp} />
          <Route path="/account/signin" component={SignIn} />
        </Switch>
        <LabelBottomNavigation />
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  handleAuthSuccess: data =>
    dispatch({
      type: USER_AUTH_SUCCESS,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      mail: data.mail,
      token: data.token
    })
});

export default connect(
  null,
  mapDispatchToProps
)(App);
