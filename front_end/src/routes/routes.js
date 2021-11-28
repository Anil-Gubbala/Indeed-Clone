import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { Dashboard } from '../components/dashboard/Dashboard';
import companyHome from '../components/companyHome/companyHome';

import NavBar from '../components/navbar/navbar';
import AdminHome from '../components/admin/AdminHome';
import CompanyReviews from '../components/reviews/companyReviews';
import Profile from '../components/profile/profile';
import SalaryBox from '../components/layout/SalariesBox';
import SavedJobs from '../components/useraccount/myjobs';

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
        <Route exact path="/reviews">
          <CompanyReviews />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/salary">
          <SalaryBox />
        </Route>
        <Route exact path="/jobs">
          <SavedJobs />
        </Route>
      </div>
    );
  }
}

export default Routes;
