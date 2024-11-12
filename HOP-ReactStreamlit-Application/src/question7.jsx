import React, { useState } from 'react';

const Question7 = () => {
  // State to track the input value
  const [inputValue, setInputValue] = useState('');

  // Event handler for the input change event
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Event handler for the button click event
  const handleButtonClick = () => {
    alert(`Button clicked! Input value: ${inputValue}`);
  };

  return (
    <div>
      <h2>Event Handling in React</h2>

      {/* Input field with onChange event */}
      <label>
        Type something:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>

      <br />

      {/* Button with onClick event */}
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
};

export default Question7;
