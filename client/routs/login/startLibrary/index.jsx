import "./index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadBackButton from "../../../components/loginPathBack";
import editIcon from "../../../assets/images/icons/edit.svg";
import barcodeIcon from "../../../assets/images/icons/barcode-read.svg";
import AddBookPopup from "./components/customBook";
import ScanBaracodePopup from "./components/scanBarcode";
import LoadSuggestedBook from "./components/suggested_book";

import LoadingAnimation from "../../../components/loadingAnimation";

export default function LoadStartLibrary(props) {
  const [popupDisplayed, setPopupDisplayed] = useState([
    {
      name: "customBook",
      open: false,
    },
    { name: "barcodeScanner", open: false },
  ]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [bookInformation, setBookInformation] = useState(0); //used to set book informatiun from barcode scan
  const navigate = useNavigate();

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

  function addUserToDB() {}

  function openSuggestedBook(event) {
    const bookID = event.target.classList[0];

    setPopupDisplayed((prev) => {
      return prev.map((option) => {
        if (option.name === "customBook") return { ...option, open: true };
        else return option;
      });
    });
    setBookInformation(bookID);
  }

  useEffect(() => {
    console.log("test");

    fetch(
      "https://openlibrary.org/subjects/fiction.json?published_in=2000-2020"
    )
      .then((response) => response.json())
      .then((data) => setSuggestedBooks(data.works));
  }, []);

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
            path={"/login/reminder"}
          />
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
            {suggestedBooksElements}
            {/* <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div> */}

            <LoadingAnimation isDisplayed={suggestedBooks} />
          </div>
        </div>
        <div className="continue_container">
          <span onClick={addUserToDB} className="continue_BTN">
            Finish
          </span>
          {/* <Link className="continue_BTN" to="/admin/books">
            Finish
          </Link> */}
        </div>
      </div>
      {/* popup */}

      <AddBookPopup
        popupDisplayed={popupDisplayed[0].open}
        togglePopup={togglePopup}
        bookId={bookInformation}
      />
      <ScanBaracodePopup
        popupDisplayed={popupDisplayed[1].open}
        togglePopup={togglePopup}
      />
    </div>
  );
}
