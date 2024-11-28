// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const messageFromParent = "Hello from Parent!";

  return (
    <div>
      <h2>Parent Component</h2>
      {/* Passing a prop called "message" to ChildComponent */}
      <ChildComponent message={messageFromParent} />
    </div>
  );
};

export default ParentComponent;
