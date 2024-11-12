import React from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom';
import facade from './util/apiFacade';
import Signup from './signup';
import "./css/index.css";
import "./css/signup.css";
import './css/App.css';

function Login() {

  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState('Loading...');


  useEffect(() => {
    facade.fetchData("diary", "GET").then((data) => setDataFromServer(data));
  }, [isLoggedIn]);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      setIsLoggedIn
    );
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
