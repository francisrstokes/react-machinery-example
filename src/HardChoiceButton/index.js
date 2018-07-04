import React from 'react';
import {StateMachine} from 'react-machinery';
import {DoAction} from './DoAction';
import {Pending} from './Pending';

const states = [
  {
    name: 'wait-for-input',
    validTransitions: ['pending'],
    beforeRender: ({resetTimer}) => resetTimer(),
    render: ({message, transitionTo}) =>
      <button onClick={() => transitionTo('pending')}>{message}</button>
  },
  {
    name: 'pending',
    validTransitions: ['aborted', 'that-was-close'],
    autoTransitions: [
      {
        test: ({timer}) => timer <= 0,
        newState: 'done'
      }
    ],
    component: Pending
  },
  {
    name: 'aborted',
    validTransitions: ['wait-for-input'],
    render: ({transitionTo}) =>
      <button onClick={() => transitionTo('wait-for-input')}>Aborted. Return?</button>
  },
  {
    name: 'that-was-close',
    validTransitions: ['wait-for-input'],
    render: ({transitionTo}) =>
      <button onClick={() => transitionTo('wait-for-input')}>Wow, that was close! Return?</button>
  },
  {
    name: 'done',
    component: DoAction
  }
];

export class HardChoiceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      currentState: 'wait-for-input',
    };
  }

  render() {
    return <StateMachine
      states={states}
      getCurrentState={() => this.state.currentState}
      setNewState={(newState) => this.setState(() => ({currentState: newState}))}
      data={{
        message: this.props.message,
        timer: this.state.timer,
        action: this.props.action,
        decreaseTimeLeft: () => {
          this.setState(() => ({timer: this.state.timer - 1}))
        },
        resetTimer: () => this.setState(() => ({timer: this.props.timer}))
      }}
    />
  }
}
