import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Dashboard from "./pages/Dashboard";
//import Books from "./pages/Books";
import Home from "./pages/Home";
//import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
//import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

