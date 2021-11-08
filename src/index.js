import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

// for redux middleware thunk
// import {Provider} from 'react-redux'
// import {combineReducers, createStore, compose, applyMiddleware} from "redux";
// import thunk from 'redux-thunk';

var deferredPrompt;

window.addEventListener('beforeinstallprompt',function (event) {
  console.log("beforeinstallprompt fired", event);
  // event.preventDefault();
  deferredPrompt = event;
  return false;
});

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode> </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
