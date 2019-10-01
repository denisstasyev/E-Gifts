import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// import Home from "containers/Home";
// import Gallery from "containers/Gallery";
// import Camera from "containers/Camera";
import Account from "containers/Account";

import LabelBottomNavigation from "components/LabelBottomNavigation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Account} />
          <Route path="/gallery" component={Account} />
          <Route path="/camera" component={Account} />
          <Route path="/account" component={Account} />
        </Switch>
        <LabelBottomNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
