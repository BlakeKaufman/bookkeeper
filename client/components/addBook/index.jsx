// import "./index.css";
import { useState } from "react";
import "./index.css";

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
  const [searchValue, setSearchValue] = useState("");
  const [booksFromSearch, setBooksFromSearch] = useState([]);
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
    setBookInformation([bookID]);
  }

  function loadISBN(isbn) {
    setBookInformation([isbn]);
    sendISBN(isbn);
  }

  function sendISBN(isbn) {
    setBookInformation([isbn]);
    setPopupDisplayed([
      {
        name: "customBook",
        open: true,
      },
      { name: "barcodeScanner", open: false },
    ]);
  }

  function handleSearch(event) {
    setSearchValue(event.target.value);

    if (!event.nativeEvent.data) return;
    if (event.target.value.length < 10) return;

    const searchURL = `https://openlibrary.org/search.json?q=${event.target.value}`;
    const numberPattern = /^\d+$/;

    fetch(searchURL)
      .then((response) => response.json())
      .then((data) => {
        const books = data.docs.map((book, id) => {
          if (!book?.isbn) return;
          console.log(book);
          const bookISBNs = book.isbn.filter((isbn) =>
            numberPattern.test(isbn)
          );

          return {
            isbn: bookISBNs[0],
            title: book.title,
            hasCover: book.cover_i && true,
          };
          //   return book;
        });
        setBooksFromSearch(books);
      });
  }

  const popupStyle = !!props.toggleFunction
    ? {
        left: props.isDisplayed ? "0%" : "100%",
        position: "absolute",
        top: props.isDisplayed ? "0%" : "0",
      }
    : {}; // admin books page to popin and out

  const suggestedBooksElements = suggestedBooks.map((book, id) => {
    return (
      <LoadSuggestedBook
        onClick={openSuggestedBook}
        key={id}
        {...book}
        hasCover={true}
      />
    );
  });

  const booksFromSearchElements = booksFromSearch.map((book, id) => {
    if (!book?.isbn || !book.hasCover) return;
    return (
      <LoadSuggestedBook
        onClick={openSuggestedBook}
        key={id}
        id={book.isbn}
        title={book.title}
        hasCover={book.hasCover}
      />
    );
  });

  return (
    <div style={popupStyle} className="add_book_popup_container">
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
        onChange={handleSearch}
        value={searchValue}
      />
      <div className="suggested_books">
        <h1>Suggested books</h1>
        <div className="books_container">
          {!searchValue && suggestedBooksElements}
          {searchValue && booksFromSearch.length === 0 && (
            <LoadingAnimation isDisplayed={true} />
          )}
          {searchValue &&
            booksFromSearch.length !== 0 &&
            booksFromSearchElements}
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
        loadISBN={loadISBN}
        ISBN={bookInformation[0]}
      />
    </div>
  );
}
