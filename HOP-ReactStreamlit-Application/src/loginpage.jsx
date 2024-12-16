import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import facade from "./util/apiFacade";
import "./css/signup.css";

function Login({ setIsLoggedIn }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const performLogin = async (evt) => {
    evt.preventDefault();

    try {
      const success = await facade.login(
        loginCredentials.username,
        loginCredentials.password
      );
      if (success) {
        setIsLoggedIn(true); // Update login state in parent component
        navigate("/graphs"); // Navigate to graphs on successful login
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.fullError?.detail || "Login failed. Please try again.");
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
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
          onChange={onChange}
        />
        <input
          placeholder="Password"
          id="password"
          value={loginCredentials.password}
          onChange={onChange}
          type="password"
        />
        <button type="button" onClick={performLogin}>
          Login
        </button>
        <NavLink to="/signup" className="btns">
          Signup
        </NavLink>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;
