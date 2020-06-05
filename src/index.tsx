import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';
import CONFIG from './config';

// axios.defaults.baseURL = CONFIG['API_URL'];
// axios.defaults.headers = {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
