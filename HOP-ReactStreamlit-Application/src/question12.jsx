import React, { useState } from 'react';

function Question12() {
  // Question5 state
  const [showContent, setShowContent] = useState(false);

  // Question12 state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Question5 function
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  function fetchActivityThenSyntax() {
    fetch('https://www.boredapi.com/api/activity/')
      .then(response => response.json())
      .then(data => console.log("Fetch (then syntax):", data))
      .catch(error => console.error(error))
      .finally(() => console.log("Finally promise fulfilled (then syntax)"));
  }

  async function fetchActivityAsyncAwait() {
    try {
      let response = await fetch('https://www.boredapi.com/api/activity/');
      let data = await response.json();
      console.log("Fetch (async/await):", data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Finally async promise fulfilled (async/await)");
    }
  }

  

  return (
    <div className="container">
       <div>
      <h2>async functions</h2>
      <button onClick={fetchActivityThenSyntax}>Fetch Activity (Then Syntax)</button>
      <button onClick={fetchActivityAsyncAwait}>Fetch Activity (Async/Await)</button>
    </div>

      <h2>Question 12</h2>
      {/* Question5 content */}
      <button onClick={toggleContent}>Toggle Content</button>
      {showContent ? (
        <div className="content-container">
          <p>This content is displayed when showContent is true.</p>
          {/* Add more content as needed */}
        </div>
      ) : (
        <p>Click the button to show the content.</p>
      )}
      </div>
      
  );
}

export default Question12;
