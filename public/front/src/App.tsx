import React, { ReactElement } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Room from './pages/Room';
import NotFound from './pages/NotFound';
import CreateRoom from './pages/CreateRoom';

const App: React.FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CreateRoom />
        </Route>
        <Route exact path="/create-room">
          <CreateRoom />
        </Route>
        <Route exact path="/rooms/:roomId">
          <Room />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
