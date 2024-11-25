import React from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom';
import facade from './util/apiFacade';
import "./css/signup.css";

function Login() {

  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState('Loading...');


  useEffect(() => {
    facade.fetchData("diary", "GET").then((data) => setDataFromServer(data));
  }, [isLoggedIn]);
  const performLogin = async (evt) => {
    evt.preventDefault();

    try {
        await facade.login(loginCredentials.username, loginCredentials.password);
        setIsLoggedIn(true); // Update login state on success
        setDataFromServer("Welcome back!"); // Dummy data for now
    } catch (error) {
        console.error("Login failed:", error);
        setDataFromServer("Login failed. Please try again.");
    }
};
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const login = async (username, password) => {
  const payload = new URLSearchParams({ username, password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  };

  const response = await fetch("http://localhost:8000/login", options);
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  console.log(data.access_token); // Save token as needed
  return data;
};


  return (
 
  
      <div className="box">
        <h1>Login</h1>
        <form onChange={onChange}>
          <input  placeholder="Username" id="username" value={loginCredentials.username} />
          <input  placeholder="Password" id="password" value={loginCredentials.password} />
          <button onClick={performLogin}>Login</button>
          <NavLink to="/signup" activeClassName="active"><button className="btns">Signup</button></NavLink>
        </form>

        </div>
    


        
    
  );
  
}

export default Login;
