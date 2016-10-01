import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, nativeHistory, Route } from 'react-router-native';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
  })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(nativeHistory, store);
history.push('/');

const App = (
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'} component={LoginPage} />
      <Route path={'/register'} component={RegisterPage} />
    </Router>
  </Provider>
);

export default App;
