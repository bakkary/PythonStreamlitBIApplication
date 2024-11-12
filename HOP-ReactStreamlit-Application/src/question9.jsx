import React, { useState, useRef } from 'react';

function CombinedComponent() {
  // Controlled component usestate
  const [controlledValue, setControlledValue] = useState('');

  // Uncontrolled component useref (trigger ikke re-render)
  const uncontrolledInputRef = useRef();

  // Event handler for controlled component
  const handleControlledChange = (event) => {
    setControlledValue(event.target.value);
  };

  // Event handler for uncontrolled component
  const handleUncontrolledClick = () => {
    const uncontrolledValue = uncontrolledInputRef.current.value;
    alert(`Uncontrolled Input Value: ${uncontrolledValue}`);
  };

  return (
    <div>
      <h2>Controlled Component</h2>
      <label>
        Controlled Input:
        <input type="text" value={controlledValue} onChange={handleControlledChange} />
      </label>
      <p>Controlled Input Value: {controlledValue}</p>

      <hr />

      <h2>Uncontrolled Component</h2>
      <label>
        Uncontrolled Input:
        <input type="text" ref={uncontrolledInputRef} />
      </label>
      <button onClick={handleUncontrolledClick}>Get Value</button>
    </div>
  );
}

export default CombinedComponent;
