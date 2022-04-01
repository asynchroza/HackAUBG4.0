import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

try{
  localStorage.getItem("user");
} catch {
  //function to generate GUID
  //check if GUID is already existing
  localStorage.setItem("user", "Misho");
}
localStorage.setItem("user","Misho");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
