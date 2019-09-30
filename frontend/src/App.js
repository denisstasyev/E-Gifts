import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "containers/Home";
import Gallery from "containers/Gallery";

import LabelBottomNavigation from "components/LabelBottomNavigation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/camera" component={Gallery} />
          <Route path="/account" component={Gallery} />
        </Switch>
        <LabelBottomNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
