import React, { Component } from "react";
import { Route } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { Dashboard } from "../components/dashboard/Dashboard";
import companyHomes from "../components/companyHome/companyHome";

import NavBar from "../components/navbar/navbar";
import AdminHome from "../components/admin/AdminHome";
import DashNav from "../components/navbar/DashNav";
import { LandingPage } from "../components/dashboard/LandingPage";
import CompanyReviews from "../components/reviews/companyReviews";
import Profile from "../components/profile/profile";
import SalaryBox from "../components/layout/SalariesBox";
import SavedJobs from "../components/useraccount/myjobs";
import ProfilePage from "../components/EmployerLanding/ProfilePage";
import AddCompanyDetails from "../components/CompanyProfile/AddCompanyDetails";
import EditCompanyPage from "../components/CompanyProfile/EditCompanyPage";

import Employer from "../components/Employer/EmployerLanding";
import PostJob from "../components/PostJob/PostJob";
import Candidates from "../components/Candidates/Candidates";
import Messages from "../components/messages/messages";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route exact path="/companyHomes" component={companyHomes} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />

        <Route exact path="/adminHome" component={AdminHome} />
        <Route exact path="/DashNav" component={DashNav} />
        <Route exact path="/landing" component={LandingPage} />

        <Route exact path="/Candidates" component={Candidates} />
        <Route exact path="/EmployerLanding" component={Employer} />
        <Route exact path="/PostJob" component={PostJob} />

        <Route exact path="/reviews">
          <CompanyReviews />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/salary">
          <SalaryBox />
        </Route>
        <Route exact path="/employerprofile" component={ProfilePage} />
        <Route exact path="/addcompany" component={AddCompanyDetails} />
        <Route exact path="/editcompany" component={EditCompanyPage} />
      </div>
    );
  }
}

export default Routes;
