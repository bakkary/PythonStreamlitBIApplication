// Question10.jsx
import React, { useState } from 'react';

const Question10 = () => {
  const [popupContent, setPopupContent] = useState('');

  // Spread Operator Example
  const handleSpreadClick = () => {
    const originalArray = [1, 2, 3, 4, 5];
    const otherArray = [6,7,8,9,10];
    const newArray = [...originalArray, ...otherArray];
  
    setPopupContent(
      <div>
        <p>Spread Operator Example:</p>
        <p>Original Array: [{originalArray.join(', ')}]</p>
        <p>Other Array: [{otherArray.join(', ')}]</p>
        <p>New Array: [...originalArray, ...otherArray] = [{newArray.join(', ')}]</p>
      </div>
    );
  };

  // Rest Operator Example
  const handleRestClick = () => {
    const sumValues = (first, ...numbers) => {
      return numbers.reduce((acc, num) => acc + num, 0);
    };

    const result = sumValues(1,2,3,4,5);
   
    
 

    setPopupContent(
      <div>
        <p>Rest Operator Example:</p>
        <p>Function: sumValues(first, ...numbers)</p>
        <p>Arguments: (1,2,3,4,5)</p>
        <p>Rest Operator: first ...numbers</p>
        <p>Rest Operator Result: [{[2,3,4,5].join(', ')}]</p>
        <p>Sum of Values: {result}</p>
      </div>
    );
  };

  const handleClosePopup = () => {
    setPopupContent('');
  };

  return (
    <div>
      <h2>Spread and Rest Operator Example</h2>

      <button onClick={handleSpreadClick}>Step 1: Spread Operator</button>
      <button onClick={handleRestClick}>Step 2: Rest Operator</button>

      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            {popupContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question10;
