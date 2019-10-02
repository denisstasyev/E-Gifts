import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Home from "containers/Home";
import Gallery from "containers/Gallery";
import Camera from "containers/Camera";
import Account from "containers/Account";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";

import LabelBottomNavigation from "components/LabelBottomNavigation";

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

function App() {
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
}

export default App;
