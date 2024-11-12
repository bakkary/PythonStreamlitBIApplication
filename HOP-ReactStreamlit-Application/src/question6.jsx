import React, { useState } from 'react';

const Question6 = () => {
  const [data, setData] = useState('');
  const [localStorageData, setLocalStorageData] = useState(localStorage.getItem('localData') || '');
  const [sessionStorageData, setSessionStorageData] = useState(sessionStorage.getItem('sessionData') || '');

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  /* web storage api tillader setitem, removeitem, getitem
  feature givet af wbe browseren selv.*/
  const handleSaveLocal = () => {
    localStorage.setItem('localData', data);
    setLocalStorageData(data);
  };

  const handleSaveSession = () => {
    sessionStorage.setItem('sessionData', data);
    setSessionStorageData(data);
  };

  const handleClearStorage = () => {
    localStorage.removeItem('localData');
    sessionStorage.removeItem('sessionData');
    setLocalStorageData('');
    setSessionStorageData('');
  };

  return (
    <div>
      <h2>Local Storage vs Session Storage</h2>
      <label htmlFor="dataInput">Enter Data:</label>
      <input
        type="text"
        id="dataInput"  // Add an id attribute
        name="dataInput"  // Add a name attribute
        value={data}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSaveLocal}>Save to Local Storage</button>
      <button onClick={handleSaveSession}>Save to Session Storage</button>
      <button onClick={handleClearStorage}>Clear Storage</button>
      <br />
      <div>
        <strong>Local Storage:</strong> {localStorageData || 'No data'}
      </div>
      <div>
        <strong>Session Storage:</strong> {sessionStorageData || 'No data'}
      </div>
    </div>
  );
};

export default Question6;
