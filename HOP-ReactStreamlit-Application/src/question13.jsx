import React, { useState } from 'react';

function Question13() {
  const [factor, setFactor] = useState('2');
  const [number, setNumber] = useState('0');
  const [count, setCount] = useState(0);

  function handleFactorChange(e) {
    setFactor(e.target.value);
  }

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  function multiply(num) {
    return num * (factor);
  }

  function sum(callback) {
    return callback(number);
  }

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <label>
        Factor:
        <input type="number" value={factor} onChange={handleFactorChange} />
      </label>
      <br />
      <label>
        Number:
        <input type="number" value={number} onChange={handleNumberChange} />
      </label>
      <br />
      <p>
        Result: {sum(multiply)}
      </p>
      <hr />
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
}

export default Question13;
