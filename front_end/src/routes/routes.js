import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyHome from '../components/companyHome/companyHome';

import NavBar from '../components/navbar/navbar';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/" component={companyHome} />
      </div>
    );
  }
}

export default Routes;
