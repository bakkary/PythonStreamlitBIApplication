import React, { useState, useEffect } from "react";
import "./css/App.css";
import "./css/graphs.css";

const STREAMLIT_URL = "http://localhost:8501";

function GraphsPage() {

  return (
    <div className="userflex">
      <div className="user-flex-item flex-item2">
        <div className="diary">
          <div className="diary-items diary-item1">
            <form>
              <input type="text" name="date" placeholder="Date" className="UP1UP3" />
            </form>
          </div>
          <div className="diary-items diary-item2">
            <form>
              <input type="text" name="mood" placeholder="Pick your mood" className="UP2" />
            </form>
          </div>
          <div className="diary-items diary-item3">
            <form>
              <input type="text" name="topic" placeholder="Today's topic" className="UP1UP3" />
            </form>
          </div>
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
