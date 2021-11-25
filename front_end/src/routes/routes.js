import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { Dashboard } from '../components/dashboard/Dashboard';
import companyHome from '../components/companyHome/companyHome';

import NavBar from '../components/navbar/navbar';
import AdminHome from '../components/admin/AdminHome';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={NavBar} />
        <Route exact path="/" component={companyHome} />
        <Route exact path="/adminHome" component={AdminHome} />
      </div>
    );
  }
}

export default Routes;
