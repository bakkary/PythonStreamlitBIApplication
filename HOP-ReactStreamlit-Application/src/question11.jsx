// Question4.jsx

import React from 'react';

function Question11() {
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
    <div>
      <h2>Question 11</h2>
      <button onClick={fetchActivityThenSyntax}>Fetch Activity (Then Syntax)</button>
      <button onClick={fetchActivityAsyncAwait}>Fetch Activity (Async/Await)</button>
    </div>
  );
}

export default Question11;
