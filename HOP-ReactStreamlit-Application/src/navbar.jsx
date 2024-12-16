import React, { useState } from "react";
import { NavLink, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./css/App.css";
import Login from "./loginpage";
import Signup from "./signup";
import GraphsPage from "./graphs";
import logo from './util/images/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/loginpage"); // Redirect to login after logout
  };

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
                <li>
                  <NavLink
                    to={isLoggedIn ? "/graphs" : "/loginpage"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <img id="logo" src={logo} alt="Logo" />
                  </NavLink>
                </li>
                <div className="mleft">
                  {!isLoggedIn && (
                    <li>
                      <NavLink
                        to="/loginpage"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Login
                      </NavLink>
                    </li>
                  )}
                  {!isLoggedIn && (
                    <li>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Signup
                      </NavLink>
                    </li>
                  )}
                  {isLoggedIn && (
                    <li>
                      <button onClick={handleLogout} className="logout-button">
                        Logout
                      </button>
                    </li>
                  )}
                </div>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        {/* Conditional rendering for the GraphsPage */}
        <Route
          path="/"
          element={
            isLoggedIn ? <GraphsPage isLoggedIn={isLoggedIn} /> : <Navigate to="/loginpage" />
          }
        />
        <Route
          path="/graphs"
          element={
            isLoggedIn ? <GraphsPage isLoggedIn={isLoggedIn} /> : <Navigate to="/loginpage" />
          }
        />
        <Route path="/loginpage" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default Navbar;
