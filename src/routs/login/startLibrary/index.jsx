import "./index.css";
import { useState } from "react";

import LoadBackButton from "../../../components/loginPathBack";
import editIcon from "../../../assets/images/icons/edit.svg";
import barcodeIcon from "../../../assets/images/icons/barcode-read.svg";

import AddBookPopup from "./components/customBook";

export default function LoadStartLibrary() {
  const [popupDisplayed, setPopupDisplayed] = useState(false);

  function togglePopup() {
    setPopupDisplayed((prevDisplay) => !prevDisplay);
  }

  return (
    <div className="start_library">
      <div className="content">
        <div className="topbar">
          <LoadBackButton path={"reminder"} />
          <h1>Start your library</h1>
          <div className="add_book_btns">
            <div onClick={togglePopup} className="icon">
              <img src={editIcon} alt="edit icon to add a custom book" />
            </div>
            <div className="icon">
              <img
                src={barcodeIcon}
                alt="scan baracode icon to add a custom book"
              />
            </div>
          </div>
        </div>
        <input
          className="book_search"
          type="text"
          name="book_search"
          id="book_search"
          placeholder="Search by title, author, or ISBN..."
        />
        <div className="suggested_books">
          <h1>Suggested books</h1>
          <div className="books_container">
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
          </div>
        </div>
        <div className="continue_container">
          <span className="continue_BTN">Finish</span>
        </div>
      </div>
      {/* popup */}

      <AddBookPopup popupDisplayed={popupDisplayed} togglePopup={togglePopup} />
    </div>
  );
}
