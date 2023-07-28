import "./index.css";
import { useState } from "react";

import LoadBackButton from "../../../components/loginPathBack";
import editIcon from "../../../assets/images/icons/edit.svg";
import barcodeIcon from "../../../assets/images/icons/barcode-read.svg";
import AddBookPopup from "./components/customBook";
import ScanBaracodePopup from "./components/scanBarcode";

export default function LoadStartLibrary() {
  const [popupDisplayed, setPopupDisplayed] = useState([
    {
      name: "customBook",
      open: false,
    },
    { name: "barcodeScanner", open: false },
  ]);
  const [bookInformation, setBookInformation] = useState({}); //used to set book informatiun from barcode scan

  function togglePopup(event) {
    const clickedOption = event.target.classList[0];

    setPopupDisplayed((prevDisplay) =>
      prevDisplay.map((option) => {
        if (option.name === clickedOption)
          return { ...option, open: !option.open };
        else return option;
      })
    );
  }

  return (
    <div className="start_library">
      <div className="content">
        <div className="topbar">
          <LoadBackButton path={"reminder"} />
          <h1>Start your library</h1>
          <div className="add_book_btns">
            <div onClick={togglePopup} className="icon">
              <img
                src={editIcon}
                className="customBook"
                alt="edit icon to add a custom book"
              />
            </div>
            <div onClick={togglePopup} className="icon">
              <img
                src={barcodeIcon}
                className="barcodeScanner"
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
          <a href="/admin/books" className="continue_BTN">
            Finish
          </a>
        </div>
      </div>
      {/* popup */}

      <AddBookPopup
        popupDisplayed={popupDisplayed[0].open}
        togglePopup={togglePopup}
      />
      <ScanBaracodePopup
        popupDisplayed={popupDisplayed[1].open}
        togglePopup={togglePopup}
      />
    </div>
  );
}
