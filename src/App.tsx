import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import TourPlay from './components/TourPlay';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={TourPlay} />
    </BrowserRouter>    
  );
}

export default App;
