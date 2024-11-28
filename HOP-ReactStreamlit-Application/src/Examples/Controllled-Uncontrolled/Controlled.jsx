import React, { useState } from 'react';

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <p>Input Value: {inputValue}</p>
    </div>
  );
};
