import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import Question1 from './question1';
import Question2 from './question2';
import Question3 from './question3';
import Question4 from './question4';
import Question5 from './question5';
import Question6 from './question6';
import Question7 from './question7';
import Question8 from './question8';
import Question9 from './question9';
import Question10 from './question10';
import Question11 from './question11';
import Question12 from './question12';
import Question13 from './question13';
// Import other question components as needed
import './css/App.css';
import Login from './loginpage';
import Signup from './signup';
import UserPage from './userPage';
import AdminPage from './adminpage';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [questionsCollapsed, setQuestionsCollapsed] = useState(true);
  const [applicationsCollapsed, setApplicationsCollapsed] = useState(true);

  const toggleQuestions = () => {
    setQuestionsCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const toggleApplications = () => {
    setApplicationsCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
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
              <div onClick={toggleQuestions}>
                Questions
                {questionsCollapsed ? ' +' : ' -'}
              </div>
              {!questionsCollapsed && (
                <ul>
                  <li><NavLink to="/question1" activeClassName="active">Question 1</NavLink></li>
                  <li><NavLink to="/question2" activeClassName="active">Question 2</NavLink></li>
                  <li><NavLink to="/question3" activeClassName="active">Question 3</NavLink></li>

                </ul>
              )}
            </li>
            <li>
              <div onClick={toggleApplications}>
                Yumi
                {applicationsCollapsed ? ' +' : ' -'}
              </div>
              {!applicationsCollapsed && (
                <ul>
                   <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                  <li><NavLink to="/loginpage" activeClassName="active">Login</NavLink></li>
                  <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                  <li><NavLink to="/user" activeClassName="active">User Page</NavLink></li>
                  <li><NavLink to="/admin" activeClassName="active">Admin Page</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/loginpage" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user"
          element={<UserPage isAdmin={isAdmin} />}
        />
        <Route
          path="/admin"
          element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
 
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />

    
      </Routes>

    </Router>
  );
}

export default App;
