import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import facade from "./util/apiFacade";
import "./css/signup.css";

function Login() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/graphs"); // Redirect to graphs page when logged in
    }
  }, [isLoggedIn]);

  const performLogin = async (evt) => {
    evt.preventDefault();

    try {
      await facade.login(loginCredentials.username, loginCredentials.password);
      setIsLoggedIn(true); // Update login state on success
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials."); // Feedback for failure
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value, // Dynamically update credentials
    });
  };

  return (
    <div className="box">
      <h1>Login</h1>
      <form>
        <input
          placeholder="Username"
          id="username"
          value={loginCredentials.username}
          onChange={onChange} // Dynamically updates state
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={loginCredentials.password}
          onChange={onChange} // Dynamically updates state
        />
        <button type="button" onClick={performLogin}>
          Login
        </button>
        <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
          <button type="button" className="btns">Signup</button>
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
