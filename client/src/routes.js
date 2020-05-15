import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import Logout from "./components/Logout";
import Options from "./components/Options";
import { Route, Switch } from "react-router-dom";
import React from "react";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/options" component={Options} />
      {/* <Route exact path="/logout" component={Logout} /> */}
    </Switch>
  );
}

/* const Routes = [
  {
    path: "/options",
    name: "Options",
    icon: SettingsIcon,
    component: Options
  }
] */
