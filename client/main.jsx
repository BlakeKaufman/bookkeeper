import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import auth0Info from "../auth0APIinformation.json";

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
  <BrowserRouter>
    <Auth0Provider
      domain={auth0Info.domain}
      clientId={auth0Info.client_id}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
