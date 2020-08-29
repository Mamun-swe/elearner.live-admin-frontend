import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/PrivateRoute';

import ScrollToTop from './Components/ScrollToTop';
import LoginPage from './Pages/Auth/Login';
import ResetPage from './Pages/Auth/Reset';
import MasterPage from './Pages/Master';
import FourOFourPage from './Pages/FourOFour/Index';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/reset" component={ResetPage} />
            <PrivateRoute path="/admin">
              <MasterPage />
            </PrivateRoute>
            <Route path="*" component={FourOFourPage} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
