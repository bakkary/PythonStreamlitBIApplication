import React from "react";
import { Navigate } from "react-router-dom";
import "./css/App.css";
import "./css/graphs.css";

const STREAMLIT_URL = "http://localhost:8501";

function GraphsPage({ isLoggedIn }) {
  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/loginpage" replace />;
  }

  return (
    <div className="userflex">
      <div className="user-flex-item flex-item2">
        <label htmlFor="streamlitApp">Streamlit Application</label>
        <iframe
          className="diary-box"
          id="streamlitApp"
          src={STREAMLIT_URL}
          title="Streamlit Application"
        ></iframe>
      </div>
    </div>
  );
}

export default GraphsPage;
