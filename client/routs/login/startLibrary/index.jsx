import "./index.css";

import LoadAddBookPage from "../../../components/addBook";
import { Link, useNavigate } from "react-router-dom/dist";
import testUserIsLoggedIn from "../../../../auth0/testUserLogin";

export default function LoadStartLibrary() {
  testUserIsLoggedIn();
  const navigate = useNavigate();

  function submitUser() {
    const userProfile = localStorage.getItem("userProfile");
    console.log(userProfile);

    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: userProfile, // Convert the request body to JSON string
    };

    const localHostURl =
      "http://localhost:8888/.netlify/functions/profile_injection";

    const productionHostURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/profile_injection";

    fetch(productionHostURL, options).then((response) => {
      if (response.status === 450)
        window.alert(
          "Please Sign out and log into account. **(Refresh Page)**"
        );
      else navigate("/admin/books");
    });
  }

  return (
    <div className="start_library">
      <LoadAddBookPage
        path="login"
        heading="Start your Library"
        backButtonPath="/login/reminder"
      />
      <div className="continue_container">
        <span onClick={submitUser} className="continue_BTN">
          Continue
        </span>
      </div>
    </div>
  );
}
