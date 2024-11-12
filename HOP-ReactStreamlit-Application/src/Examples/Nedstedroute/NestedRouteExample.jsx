import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Outlet } from 'react-router-dom';

// Components for nested routes
const UserProfile = () => <div>User Profile</div>;
const UserSettings = () => <div>User Settings</div>;

// Parent component with nested routes
const UserDashboard = () => (
  <div>
    <h2>User Dashboard</h2>
    <nav>
      <ul>
        <li><NavLink to="profile" activeClassName="active-link">Profile</NavLink></li>
        <li><NavLink to="settings" activeClassName="active-link">Settings</NavLink></li>
      </ul>
    </nav>
    <hr />
    <Outlet /> {/* Child routes will be rendered here */}
  </div>
);


// Main component with routes
const App = () => (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />}>
        <Route index element={<div>Welcome to the User Dashboard!</div>} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
