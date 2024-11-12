// App.js for Single-Page Application
import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>

      <Switch>
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route path="/" component={Home} />
</Switch> //can be replaced with <routes>...</routes>
    </Router>
  );
}

export default App;
