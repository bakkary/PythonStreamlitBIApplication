import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import facade from "./util/apiFacade"; // Import the apiFacade
import "./css/App.css";
import "./css/index.css";
import "./css/signup.css";

function Signup({ setUser }) {
  const init = { username: "", password: "", confirmPassword: "", useremail: "" };
  const [signupData, setSignupData] = useState(init);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const performSignup = async (evt) => {
    evt.preventDefault();

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Use facade.signup to make the API call
      const success = await facade.signup(
        signupData.username,
        signupData.password,
        signupData.useremail
      );

      if (success) {
        setSuccess("Signup successful!");
        setError("");
        setSignupData(init); // Clear form data on success
        setTimeout(() => navigate("/loginpage"), 1000); // Redirect to login page after 1 second
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.fullError?.detail || "An error occurred during signup.");
    }
  };

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setSignupData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="box">
      <h1>Signup</h1>

      <form onSubmit={performSignup}>
        <input
          placeholder="Username"
          id="username"
          value={signupData.username}
          onChange={handleChange}
        />
        <input
          placeholder="User email"
          id="useremail"
          value={signupData.useremail}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <input
          placeholder="Confirm password"
          type="password"
          id="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>
        <NavLink
          to="/loginpage"
          className={({ isActive }) => (isActive ? "active btns" : "btns")}
        >
          Login
        </NavLink>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default Signup;
