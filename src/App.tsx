import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import TourPlay from './components/TourPlay';
import TourView from './components/TourView';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={TourPlay} />
      <Route exact path="/full-view" component={TourView} />
    </BrowserRouter>    
  );
}

export default App;
