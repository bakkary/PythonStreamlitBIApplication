import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom"; // Updated imports
import "./css/App.css";
import Login from "./loginpage";
import Signup from "./signup";
import GraphsPage from "./graphs";
import logo from './util/images/logo.png';

function Navbar() {
  const [applicationsCollapsed, setApplicationsCollapsed] = useState(true);

  return (
    <div>
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
                <li className = "paddR"> 
                  <NavLink
                    to="/graphs"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <img id="logo" src={logo} alt="Logo" />
                  </NavLink>
                </li>
                <div className="mleft">
                <li className = "marrR">
                  <NavLink
                    to="/loginpage"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
                </div>
                <div>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Signup
                  </NavLink>
                </li>
                </div>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<GraphsPage />} />
        <Route path="/graphs" element={<GraphsPage />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default Navbar;
