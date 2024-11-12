import React, { useState } from 'react';

function Question1() {
  const [factor, setFactor] = useState('2');
  const [number, setNumber] = useState('0');

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
    </div>
  );
}

export default Question1;
