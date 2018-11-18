import React from "react";
import { Route, Switch } from "react-router";
import Home from "../containers/Home";
import Counter from "../containers/Counter";
import Curry from "../containers/Curry";
import Once from "../containers/Once";
import Sort from "../containers/Sort";
import About from "../containers/About";
import Error404 from "../containers/Error404";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/curry" component={Curry} />
      <Route path="/once" component={Once} />
      <Route path="/sort" component={Sort} />
      <Route path="/about" component={About} />
      <Route path="*" component={Error404} />
    </Switch>
  </div>
);

export default routes;
