import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DialogManagerUi, SbBootstrapStyles, SbDashboardStyles, SbStyles } from '@soundbite/widgets-react';

//NOTE: The SbBootstrapStyles, SbDashboardStyles, and SbStyles are components that emit CSS
//      controlling the look and feel of Soundbite Widets. Without these components, styles
//      will not be present.

//NOTE: The DialogManagerUi is a component that manages dialog boxes and confirmation messages displayed 
//      from Soundbite Widgets.  Without this component dialogs will NOT appear.

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