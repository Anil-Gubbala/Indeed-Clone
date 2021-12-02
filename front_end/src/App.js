import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Routes from './routes/routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import ShowMessage from './components/ShowError/ShowMessage';

function App() {
  return (
    <Provider store={store}>
      <>
        <BrowserRouter>
          <div>
            <ShowMessage />
            <Routes />
          </div>
        </BrowserRouter>
      </>
    </Provider>
  );
}

export default App;
