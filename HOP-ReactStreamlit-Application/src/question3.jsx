import React, { useEffect, useState } from 'react';

function ExampleComponent() {
  // State variable for counting
  const [count, setCount] = useState(0);
  
  // useEffect to run whenever 'count' changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Dependency array with 'count' means it runs when 'count' changes

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default ExampleComponent;
