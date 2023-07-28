import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

function changeBodyHeight() {
  const userAgentString = window.clientInformation.userAgent;

  let safariAgent = userAgentString.indexOf("Safari");

  if (safariAgent > -1) {
    document.body.style.height = `${window.innerHeight}px`;
  }
}
changeBodyHeight();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
