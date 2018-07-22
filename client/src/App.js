import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";
//import Login from "./pages/Login";
//import Signup from "./pages/Signup";
//import Dashboard from "./pages/Dashboard";
//import Books from "./pages/Books";
import Home from "./pages/Home";
//import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
//import Nav from "./components/Nav";

const Protected = () => <h3>Protected</h3>;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Protected} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

