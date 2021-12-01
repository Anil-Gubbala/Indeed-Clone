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
import Salaries from '../components/Salaries/salaries';
import SalaryLayout from '../components/layout/salarylayout';
import AppliedJobs from '../components/useraccount/AppliedJobs';

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
          <Salaries />
        </Route>
        <Route exact path="/savedjobs">
          <SavedJobs />
        </Route>
        <Route exact path="/appliedjobs">
          <AppliedJobs />
        </Route>
      </div>
    );
  }
}

export default Routes;
