import React from 'react';
import Build from './components';
import OpenMovie from './components/OpenMovie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path='/' component={Build}></Route>
          <Route path='/movie/:id' component={OpenMovie}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
