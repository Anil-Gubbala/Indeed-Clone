import React, { Component, Fragment,useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import store from './store';
import Routes from "./routes/routes";
import {Provider} from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

function App() {
  
  return (
    <Provider store={store}>
      <Fragment>
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
    </Fragment>
    </Provider>
  );
}

export default App;
