import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "../components/landingPage/landingPage";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { Dashboard } from "../components/dashboard/Dashboard";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default Routes;
