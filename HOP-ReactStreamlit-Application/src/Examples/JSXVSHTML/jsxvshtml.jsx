import React from 'react';

const JSXvsHTMLExamples = () => {
  // Example 1: Basic Element
  const jsxElement1 = <div>Hello, JSX!</div>;

  // html
  '<div>Hello, HTML!</div>';

  // Example 2: Attributes and Expressions
  const name = "World";
   <p>Hello, {name}!</p>;

   // html
  '<p>Hello, World!</p>';

  // Example 3: Conditional Rendering
  const isLoggedIn = true;
  const jsxElement3 = (
    <div>
      {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in.</p>}
    </div>
  );

  // html
  '<div><p>Welcome, User!</p></div>';

  // Example 4: Styling
  const styles = {
    color: 'blue',
    fontSize: '18px'
  };
  const jsxElement4 = <p style={styles}>Styled JSX Text</p>;
  
 // html
 '<p style="color: blue; font-size: 18px;">Styled HTML Text</p>';

  // Example 5: Class Names
  const className = "custom-class";
  const jsxElement5 = <div className={className}>Styled JSX Text</div>;
  
  // html
  '<div class="custom-class">Styled HTML Text</div>';

  // Example 6: Event Handling
  const handleClick = () => {
    alert('Button Clicked!');
  };
  const jsxElement6 = <button onClick={handleClick}>Click me</button>;

  // html
 '<button onclick="alert(\'Button Clicked!\')">Click me</button>';


  return (
    <div>
      {/* Render JSX examples */}
      <div>
        <h2>JSX Examples:</h2>
        {jsxElement1}
        {jsxElement2}
        {jsxElement3}
        {jsxElement4}
        {jsxElement5}
        {jsxElement6}
        {selfClosingElement}
      </div>

      {/* Render HTML counterparts */}
      <div>
        <h2>HTML Counterparts:</h2>
        <pre>{htmlElement1}</pre>
        <pre>{htmlElement2}</pre>
        <pre>{htmlElement3}</pre>
        <pre>{htmlElement4}</pre>
        <pre>{htmlElement5}</pre>
        <pre>{htmlElement6}</pre>
        <pre>{selfClosingHtmlElement}</pre>
      </div>
    </div>
  );
};

export default JSXvsHTMLExamples;
