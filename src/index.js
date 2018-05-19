import React, { Component } from 'react';
import { render } from 'react-dom';
import { ChannelsList } from './ChannelsList';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <ChannelsList/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
