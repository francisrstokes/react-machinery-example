import React from 'react';
import ReactDOM from 'react-dom';
import {HardChoiceButton} from './HardChoiceButton';
import './index.css';

ReactDOM.render(
  <HardChoiceButton
    message='Launch Missiles'
    timer={5}
    action={() => alert('kaboom!')}
  />,
  document.getElementById('root')
);

