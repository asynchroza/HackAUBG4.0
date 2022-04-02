import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const generateToken = () => {
  let charArr = "ABCD12345";
  let charLen = charArr.length;
  let result = "";
  for (var i = 0; i < 5; i++) {
    result += charArr.at(Math.random() * 9); // check for elements out of bounds
  }
  return result;
};

if (localStorage.getItem("user") == null) {
  localStorage.setItem("user", generateToken());
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
