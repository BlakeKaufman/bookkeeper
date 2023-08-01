import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RedirectPage = (actionType) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Wait for the authentication status to be determined
    if (!isLoading && isAuthenticated && actionType) {
      // User is authenticated, redirect to the next page
      if (actionType === "login") navigate("/admin/books");
      else if (actionType === "signUp") navigate("/login/reminder");
    }
  }, [isLoading, isAuthenticated, history]);
};

export default RedirectPage;
