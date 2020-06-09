import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store'
import * as serviceWorker from './serviceWorker';
// import RequestHelper from './utils/Request.Utils';

// if (localStorage.token)
//   RequestHelper.setToken(localStorage.token)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
