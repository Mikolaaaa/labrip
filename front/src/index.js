import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
