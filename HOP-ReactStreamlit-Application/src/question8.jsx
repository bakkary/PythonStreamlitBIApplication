import React, { useState } from 'react';

function Question8() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [newItemText, setNewItemText] = useState('');

  const renderedItems = items.map((item, index) => (
    <li key={index + 1}>
      {item}
      <button onClick={() => deleteItem(index + 1)}>Delete</button>
    </li>
  ));

  const deleteItem = (id) => {
    console.log(`Deleting item with ID: ${id}`);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  
  

  const handleClick = (element, phase) => {
    console.log(`${phase} on ${element} element`);
  };

  const handleCaptureOuter = () => {
    console.log('Captured Outer during capture');
    handleClick('inner', 'Bubbling');
    handleClick('middle', 'Bubbling');
  };

  const handleBubblingButton = () => {
    handleClick('inner', 'Bubbling');
    handleClick('middle', 'Bubbling');
    handleClick('outer', 'Bubbling');
  };

  return (
    <div>
      <h1>Question 8</h1>
      <div id="outer">
        <div id="middle">
          <div id="inner">
            <button onClick={handleCaptureOuter}>Capture Outer and Bubble</button>
            <button onClick={handleBubblingButton}>Bubbling Button</button>
          </div>
        </div>
      </div>

      <ul>{renderedItems}</ul>

      <div>
        <label>
          New Item Text:
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
        </label>
        <button onClick={() => setItems((prevItems) => [...prevItems, newItemText])}>
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Question8;
