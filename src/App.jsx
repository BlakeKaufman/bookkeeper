import { Route, Routes } from "react-router-dom";

import LoadLandingPage from "./routs/login/homepage";
import LoadBookGoal from "./routs/login/bookGoal";
import LoadReminder from "./routs/login/reminder";
import LoadStartLibrary from "./routs/login/startLibrary";
import LoadAdminBooks from "./routs/admin/books";
import LoadStatsAdmin from "./routs/admin/stats";

import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function App() {
  // useEffect(() => {
  //   fetch("/api")
  //     .then((respone) => respone.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);
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
