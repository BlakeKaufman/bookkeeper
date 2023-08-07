import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function testUserIsLoggedIn() {
  // Simulate the user's authentication status or role
  const { isAuthenticated } = useAuth0(); // Replace this with your actual authentication check logic

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated and has the appropriate role to access the admin page
    if (!isAuthenticated) {
      // If not authenticated or doesn't have the admin role, redirect to the homepage
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
}
