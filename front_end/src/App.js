import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Routes from './routes/routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import ShowError from './components/ShowError/ShowError';

function App() {
  return (
    <Provider store={store}>
      <>
        <BrowserRouter>
          <div>
            <ShowError />
            <Routes />
          </div>
        </BrowserRouter>
      </>
    </Provider>
  );
}

export default App;
