import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';

import './css/App.css';
import Login from './loginpage';
import Signup from './signup';
import GraphsPage from './graphs';

function Navbar() {
  const [applicationsCollapsed, setApplicationsCollapsed] = useState(true);


  return (

    <div>
    <Router>
      <header>
        <div className="menu-toggle" id="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="nav">
          <ul>
            <li>
          
                <ul>
                   <li><NavLink to="/graphs" activeClassName="active">Home</NavLink></li>
                  <li><NavLink to="/loginpage" activeClassName="active">Login</NavLink></li>
                  <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                </ul>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/graphs" element={<GraphsPage />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

    </Router>

  

    </div>

  );
}

export default Navbar;
