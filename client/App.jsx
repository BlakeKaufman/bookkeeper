import { Route, Routes } from "react-router-dom";

import LoadLandingPage from "./routs/login/homepage";
import LoadBookGoal from "./routs/login/bookGoal";
import LoadReminder from "./routs/login/reminder";
import LoadStartLibrary from "./routs/login/startLibrary";
import LoadAdminBooks from "./routs/admin/books";
import LoadStatsAdmin from "./routs/admin/stats";
import LoadWishlistAdmin from "./routs/admin/wishlist";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadLandingPage />} />
      <Route path="/login/bookGoal" element={<LoadBookGoal />} />
      <Route path="/login/reminder" element={<LoadReminder />} />
      <Route path="/login/startLibrary" element={<LoadStartLibrary />} />
      <Route path="/admin/books" element={<LoadAdminBooks />} />
      <Route path="/admin/stats" element={<LoadStatsAdmin />} />
      <Route path="/admin/wishlist" element={<LoadWishlistAdmin />} />
    </Routes>
  );
}

export default App;
