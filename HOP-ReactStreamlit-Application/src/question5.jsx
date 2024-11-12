import React, { useState } from 'react';

function Question5() {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <h2>Question 5</h2>
      <button onClick={toggleContent}>Toggle Content</button>

      {showContent ? (
        <div>
          <p>This content is displayed when showContent is true.</p>
        </div>
      ) : (
        <p>Click the button to show the content.</p>
      )}
    </div>
  );
}

export default Question5;
