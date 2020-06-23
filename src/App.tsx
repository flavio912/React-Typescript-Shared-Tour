import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import VirtualTour from './components/VirtualTour';
import TourRequest from './components/TourRequest';
import TourView from './components/TourView';

// import TourPlay from './components/TourPlay';
// import TourStart from './components/TourStart';
// import TourInside from './components/TourInside';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/virtual-tour/:id" component={VirtualTour} />
        <Route exact path="/tour/request" component={TourRequest} />
        <Route exact path="/reset-password" component={Homepage} />
        <Route exact path="/tour/view/:token" component={TourView} />
        {/* <Route exact path="/tour" component={TourPlay} />
        <Route exact path="/tour/start" component={TourStart} />
        <Route exact path="/tour/inside" component={TourInside} /> */}
      </Switch>
    </Router>    
  );
}

export default App;
