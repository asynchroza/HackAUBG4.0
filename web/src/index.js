import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

try{
  localStorage.getItem("user");
} catch {
  //function to generate TOKEN
  //check if GUID is already existing
  localStorage.setItem("user", "TOKEN");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
