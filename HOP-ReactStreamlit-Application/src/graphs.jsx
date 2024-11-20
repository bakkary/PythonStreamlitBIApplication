import React, { useState, useEffect } from "react";
import "./css/App.css";
import "./css/graphs.css";

const STREAMLIT_URL = "http://localhost:8501";

function GraphsPage() {

  return (
    <div className="userflex">
      <div className="user-flex-item flex-item2">
        <div className="diary">
          <div className="diary-items diary-item4">
            <label htmlFor="streamlitApp">Streamlit Application</label>
              <iframe
              className="diary-box"
              id="streamlitApp"
              src={STREAMLIT_URL}
              title="Streamlit Application"
              ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphsPage;
