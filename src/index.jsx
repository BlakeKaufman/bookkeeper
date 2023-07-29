import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

function changeBodyHeight() {
  const userAgentString = window.clientInformation.userAgent;

  let safariAgent = userAgentString.indexOf("Safari");

  if (safariAgent > -1) {
    document.body.style.height = `${window.innerHeight}px`;
  }
}
changeBodyHeight();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-f0cddgkt6lfmymge.us.auth0.com"
    clientId="KvALbmJuwFx5lrzOSHR6Z4u0WEjOIz8G"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
