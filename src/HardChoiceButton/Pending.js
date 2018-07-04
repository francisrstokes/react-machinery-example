import React from 'react';

export class Pending extends React.Component {
  componentDidMount() {
    this.interval = setInterval(this.props.decreaseTimeLeft, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  abort = () => {
    if (this.props.timer === 1) {
      this.props.transitionTo('that-was-close');
    } else {
      this.props.transitionTo('aborted');
    }
  }

  render() {
    return <button onClick={this.abort}>
      Action will automatically take place in {this.props.timer} seconds. Click to abort!
    </button>
  }
}