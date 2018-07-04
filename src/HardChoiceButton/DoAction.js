import React from 'react';

export class DoAction extends React.Component {
  componentDidMount() {
    this.props.action();
  }

  render() {
    return <button disabled>Done.</button>
  }
}