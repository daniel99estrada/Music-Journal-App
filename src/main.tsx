import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Make sure the path is correct
import './index.css';

// This line will render your app inside the element with the ID 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
