import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import TourPlay from './components/TourPlay';
import TourView from './components/TourView';
import TourStart from './components/TourStart';
import TourInside from './components/TourInside';
import TourRequest from './components/TourRequest';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/tour" component={TourPlay} />
      <Route exact path="/tour/view" component={TourView} />
      <Route exact path="/tour/start" component={TourStart} />
      <Route exact path="/tour/inside" component={TourInside} />
      <Route exact path="/tour/request" component={TourRequest} />
    </BrowserRouter>    
  );
}

export default App;
