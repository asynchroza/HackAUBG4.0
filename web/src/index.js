import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const axios = require("axios").default;

const generateToken = () => {
  let charArr = "ABCD12345";
  let charLen = charArr.length;
  let result = "1234";
  // for (var i = 0; i < 5; i++) {
  //   result += charArr.at(Math.random() * 9); // check for elements out of bounds
  // }
  return result;
};

if (localStorage.getItem("user") == null) {
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

// axios.get(`http://127.0.0.1:6969/login/${localStorage.getItem("user")}`).then((response)=>{
//   console.log(response.data);
// }).catch((error)=>{
//   console.log(error);
// }).then(()=>{
//   console.log("axios passed");
// })

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
