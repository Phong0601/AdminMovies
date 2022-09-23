import "../App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Admin from "features/Admin";
import Movies from "features/Admin/Movies/Movies";
import User from "features/Admin/User/User";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/"} exact component={Admin} />
          <Route path={"/movies"} exact component={Movies} />
          <Route path={"/users"} exact component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
