import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Wait for the authentication status to be determined
    if (!isLoading && isAuthenticated) {
      // User is authenticated, redirect to the next page
      navigate("/login/bookGoal");
    }
  }, [isLoading, isAuthenticated, history]);
};

export default RedirectPage;
