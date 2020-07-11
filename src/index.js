import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Poll from './Poll';
import Leaderboard from './Leaderboard';
import Frontpage from './Frontpage';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route path="/poll/:id" component={Poll} />
      <Route exact path="/" component={App} />
      <Route exact path="/Leaderboard" component={Leaderboard} />
      <Route exact path="/Frontpage" component={Frontpage} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
