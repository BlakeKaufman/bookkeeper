import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import LoadLandingPage from "./routs/login/homepage";
import LoadBookGoal from "./routs/login/bookGoal";
import LoadReminder from "./routs/login/reminder";
import LoadStartLibrary from "./routs/login/startLibrary";
import LoadAdminBooks from "./routs/admin/books";
import LoadStatsAdmin from "./routs/admin/stats";

import "./App.css";

function App() {
  useEffect(() => {
    // Example data to send in the request body (you can use JSON or any other format)
    const requestBody = {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    };

    // Options for the Fetch request
    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    fetch("/.netlify/functions/database_injection", options)
      .then((respone) => respone.json())
      .then((data) => console.log(JSON.parse(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoadLandingPage />} />
      <Route path="/login/bookGoal" element={<LoadBookGoal />} />
      <Route path="/login/reminder" element={<LoadReminder />} />
      <Route path="/login/startLibrary" element={<LoadStartLibrary />} />
      <Route path="/admin/books" element={<LoadAdminBooks />} />
      <Route path="/admin/stats" element={<LoadStatsAdmin />} />
    </Routes>
  );
}

export default App;
