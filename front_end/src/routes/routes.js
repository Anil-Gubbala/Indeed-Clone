import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyHome from '../components/companyHome/companyHome';
import Messages from '../components/messages/messages';

import NavBar from '../components/navbar/navbar';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={companyHome} />
        <Route exact path="/a" component={Messages} />
      </div>
    );
  }
}

export default Routes;
