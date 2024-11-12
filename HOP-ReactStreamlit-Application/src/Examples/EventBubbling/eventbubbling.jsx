import React from 'react';

class EventBubblingExample extends React.Component {
  handleClick = (element) => {
    console.log(`Clicked on ${element} element`);
  };

  render() {
    return (
      <div id="outer" onClick={() => this.handleClick('outer')}>
        <div id="middle" onClick={() => this.handleClick('middle')}>
          <div id="inner" onClick={() => this.handleClick('inner')}>
            Click me!
          </div>
        </div>
      </div>
    );
  }
}

export default EventBubblingExample;
