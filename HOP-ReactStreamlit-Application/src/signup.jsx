import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/App.css";
import "./css/index.css";
import "./css/signup.css";

function Signup({ setUser }) {
  const init = { username: "", password: "", confirmPassword: "", useremail: "" };
  const [signupData, setSignupData] = useState(init);
  const [error, setError] = useState(false);

  const performSignup = async (evt) => {
    evt.preventDefault();

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupData.username,
          password: signupData.password,
          email: signupData.useremail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Error during signup. Please try again.");
        return;
      }

      setError(false); // Clear errors
      setUser(signupData.username); // Assuming signup is successful
    } catch (error) {
      setError("Error connecting to the server. Please try again.");
      console.error(error);
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
    </div>
  );
}

export default Signup;
