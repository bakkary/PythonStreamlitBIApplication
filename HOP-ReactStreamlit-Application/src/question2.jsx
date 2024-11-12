import React, { useState } from 'react';
import './css/App.css';


// Main Question2 component
function Question2() {
  const [message, setMessage] = useState('');

  // Callback function to be passed to a child component
  const handleCallback = (dataFromChild) => {
    setMessage(`Data received from child: ${dataFromChild}`);
  };

  return (
  
  
    <div className="flexbox">
      <div>
        <h2>Render Callback Example</h2>
        {/* Displaying Message from Child */}
        <p>{message}</p>
        {/* Render a child component and pass the callback as a prop */}
        <ChildComponent callback={handleCallback} />
      </div>
    </div>
  );
}


// Child component that uses the callback(handleCallback)
function ChildComponent({ callback }) {
  const [customMessage, setCustomMessage] = useState('');

  const sendDataToParent = () => {
    // Call the callback function passed from the parent with custom message
    callback(customMessage);
  };

  const handleInputChange = (event) => {
    setCustomMessage(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <p>Child Component</p>
      <label>
        Enter Custom Message:
        <input type="text" value={customMessage} onChange={handleInputChange} />
      </label>
      {/* senddatatoparent invokes the callback function which invokes the handlecallback in parent */}
      <button onClick={sendDataToParent}>Send Data to Parent</button>
    </div>
  );
}

export default Question2;
