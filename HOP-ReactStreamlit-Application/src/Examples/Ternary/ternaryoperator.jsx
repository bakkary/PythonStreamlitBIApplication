import React, { useState } from 'react';

function ExampleComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, User! You are logged in.</p>
      ) : (
        <p>Please log in to access the content.</p>
      )}
    </div>
  );
}

export default ExampleComponent;
