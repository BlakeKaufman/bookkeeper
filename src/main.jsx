import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./index.css";

function changeBodyHeight() {
  const userAgentString = window.clientInformation.userAgent;

  let safariAgent = userAgentString.indexOf("Safari");

  if (safariAgent > -1) {
    document.body.style.height = `${window.innerHeight}px`;
  }
}
changeBodyHeight();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
