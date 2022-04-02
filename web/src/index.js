import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const axios = require("axios").default;

const generateToken = () => {
  let charArr = "ABCD12345";
  let charLen = charArr.length;
  let result = "1234"; // changed for testing purposes
  // for (var i = 0; i < 5; i++) {
  //   result += charArr.at(Math.random() * 9); // check for elements out of bounds
  // }
  return result;
};

if (localStorage.getItem("user") == null) {
  // if user does not exist, generate user and post to database
  localStorage.setItem("user", generateToken());
  axios
    .post(`http://127.0.0.1:6969/login/${localStorage.getItem("user")}`)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      console.log("AXIOS POST");
    });
}


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
