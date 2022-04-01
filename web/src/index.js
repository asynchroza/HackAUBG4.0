import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const generateToken = () => {
  let charArr = [];
  return [(Math.random()*charArr.length)];
}

if(localStorage.getItem("user") == null){

  localStorage.setItem("user", generateToken());
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
