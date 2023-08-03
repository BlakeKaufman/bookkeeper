// import "./index.css";
import { useState } from "react";

import LoadBackButton from "../loginPathBack";
import editIcon from "../../assets/images/icons/edit.svg";
import barcodeIcon from "../../assets/images/icons/barcode-read.svg";
import LoadSuggestedBook from "./components/suggested_book";
import LoadAddBookPopup from "./components/customBook";
import ScanBaracodePopup from "./components/scanBarcode";

import LoadingAnimation from "../loadingAnimation";

const suggestedBooksOBJ = [
  { id: "0525478817" },
  { id: "0062024035" },
  { id: "0375969020" },
  { id: "0545663261" },
  { id: "0297859382" },
  { id: "0804139024" },
  { id: "1476746583" },
  { id: "030788743X" },
  { id: "1406356883" },
  { id: "0385534639" },
  { id: "9781423113393" },
  { id: "0553801473" },
  { id: "1547601329" },
  { id: "0062059939" },
  { id: "1250012570" },
  { id: "9781509803156" },
  { id: "1410477762" },
  { id: "1594744769" },
];

export default function LoadAddBookPage(props) {
  const [popupDisplayed, setPopupDisplayed] = useState([
    {
      name: "customBook",
      open: false,
    },
    { name: "barcodeScanner", open: false },
  ]);
  const [suggestedBooks, setSuggestedBooks] = useState(suggestedBooksOBJ);
  const [bookInformation, setBookInformation] = useState([]); //used to set book informatiun from barcode scan

  function togglePopup(event) {
    const clickedOption = event.target.classList[0];

    setPopupDisplayed((prevDisplay) =>
      prevDisplay.map((option) => {
        if (option.name === "customBook" && option.open) setBookInformation([]);
        if (option.name === clickedOption)
          return { ...option, open: !option.open };
        else return option;
      })
    );
  }

  function openSuggestedBook(event) {
    const bookID = event.target.classList[0];

    setPopupDisplayed((prev) => {
      return prev.map((option) => {
        if (option.name === "customBook") return { ...option, open: true };
        else return option;
      });
    });
    setBookInformation([bookID, event.target.src]);
  }

  const popupStyle = !!props.toggleFunction
    ? {
        left: props.isDisplayed ? "0" : "100%",
      }
    : {}; // admin books page to popin and out

  const suggestedBooksElements = suggestedBooks.map((book, id) => {
    return <LoadSuggestedBook onClick={openSuggestedBook} key={id} {...book} />;
  });

  return (
    <div style={popupStyle} className="start_library">
      <div className="content">
        <div className="topbar">
          <LoadBackButton
            toggleFunction={props.toggleFunction}
            path={props.backButtonPath}
          />
          <h1>{props.heading}</h1>
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
          <div className="books_container">{suggestedBooksElements}</div>
        </div>
        <div className="continue_container">
          <span onClick={props.addUserToDB} className="continue_BTN">
            Finish
          </span>
        </div>
      </div>
      {/* popup */}

      <LoadAddBookPopup
        popupDisplayed={popupDisplayed[0].open}
        togglePopup={togglePopup}
        bookInformation={bookInformation}
        setBookInformation={setBookInformation}
      />
      <ScanBaracodePopup
        popupDisplayed={popupDisplayed[1].open}
        togglePopup={togglePopup}
      />
    </div>
  );
}
