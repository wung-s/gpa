import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const MuiApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
)
ReactDOM.render(
  <MuiApp />,
  document.getElementById('root')
);
