import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";
import { GraphHome } from "./components/home/GraphHome";

function PrivateRoute({path, component, ...rest}) {
  const storage = localStorage.getItem("storage");
  const data = JSON.parse(storage);
  if (data && data.users) {
    return <Route path={path} component={component} {...rest} />;
  } else {
    return <Redirect to="/login" {...rest} />;
  }
}
export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/favs" component={FavPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}
