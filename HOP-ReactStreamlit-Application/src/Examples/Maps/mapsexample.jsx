import React from 'react';

class ListRenderingExample extends React.Component {
  render() {
    // Before using .map
    const itemsBeforeMap = ['Item 1', 'Item 2', 'Item 3'];

    // After using .map
    const itemsAfterMap = ['Item 1', 'Item 2', 'Item 3'];

    return (
      <div>
        <h2>Before Using .map</h2>
        <ul>
          <li>{itemsBeforeMap[0]}</li>
          <li>{itemsBeforeMap[1]}</li>
          <li>{itemsBeforeMap[2]}</li>
        </ul>

        <h2>After Using .map</h2>
        <ul>
          {itemsAfterMap.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListRenderingExample;
