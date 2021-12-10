import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DialogManagerUi, SbBootstrapStyles, SbDashboardStyles, SbStyles } from '@soundbite/widgets-react';

ReactDOM.render(
  <React.StrictMode>
    <SbBootstrapStyles />
    <SbDashboardStyles />
    <SbStyles />
    <App />
    <DialogManagerUi />
  </React.StrictMode>,
  document.getElementById('root')
);