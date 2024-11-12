import React, { useRef } from 'react';

const UncontrolledInput = () => {
  const inputRef = useRef();

  const handleClick = () => {
    alert(`Input value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Show Input Value</button>
    </div>
  );
};
