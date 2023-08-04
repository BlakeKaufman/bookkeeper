import "./index.css";

import LoadAddBookPage from "../../../components/addBook";
import { Link } from "react-router-dom/dist";

export default function LoadStartLibrary() {
  return (
    <div className="start_library">
      <LoadAddBookPage
        path="login"
        heading="Start your Library"
        backButtonPath="/login/reminder"
      />
      <div className="continue_container">
        <Link className="continue_BTN" to="/admin/books">
          Continue
        </Link>
      </div>
    </div>
  );
}
