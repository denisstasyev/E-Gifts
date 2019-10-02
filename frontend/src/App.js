import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Home from "containers/Home";
import Gallery from "containers/Gallery";
import Camera from "containers/Camera";
import Account from "containers/Account";

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
          <Route path="/account" component={Account} />
        </Switch>
        <LabelBottomNavigation />
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
