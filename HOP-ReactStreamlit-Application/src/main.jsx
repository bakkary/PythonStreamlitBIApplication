import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Added BrowserRouter
import "./css/index.css";
import Navbar from "./navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </React.StrictMode>
);
