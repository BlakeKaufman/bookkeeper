import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
export default function SignUp() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup", // This indicates that the user should see the sign-up screen
    });
    localStorage.setItem("buttonType", JSON.stringify("signUp"));
  };

  return <button onClick={handleSignUp}>Get Started</button>;
}
