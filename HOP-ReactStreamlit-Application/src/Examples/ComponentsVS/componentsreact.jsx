import React from 'react';
import ReactDOM from 'react-dom';

const items = ['Apple', 'Banana', 'Orange'];

// React component for rendering items
const ItemList = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Rendering the React component
ReactDOM.render(<ItemList items={items} />, document.getElementById('root'));
