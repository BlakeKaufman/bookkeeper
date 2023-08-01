import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => {
        loginWithRedirect({
          redirect_uri: `${window.location.origin}/admin/books`, // Replace with your desired redirect page
        });
        localStorage.setItem("buttonType", JSON.stringify("login"));
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
