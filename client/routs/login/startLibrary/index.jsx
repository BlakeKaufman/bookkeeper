import "./index.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LoadBackButton from "../../../components/loginPathBack";
import editIcon from "../../../assets/images/icons/edit.svg";
import barcodeIcon from "../../../assets/images/icons/barcode-read.svg";
import LoadAddBookPopup from "./components/customBook";
import ScanBaracodePopup from "./components/scanBarcode";
import LoadSuggestedBook from "./components/suggested_book";

import LoadingAnimation from "../../../components/loadingAnimation";

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

export default function LoadStartLibrary(props) {
  const [popupDisplayed, setPopupDisplayed] = useState([
    {
      name: "customBook",
      open: false,
    },
    { name: "barcodeScanner", open: false },
  ]);
  const [suggestedBooks, setSuggestedBooks] = useState(suggestedBooksOBJ);
  const [bookInformation, setBookInformation] = useState([]); //used to set book informatiun from barcode scan
  const { user } = useAuth0();

  function togglePopup(event) {
    const clickedOption = event.target.classList[0];

    setPopupDisplayed((prevDisplay) =>
      prevDisplay.map((option) => {
        if (option.name === "customBook" && option.open) setBookInformation(0);
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
    setBookInformation([bookID, event.target.src]);
  }

  function addBookToDB() {
    console.log("added to db");
    console.log(bookInformation);
    console.log(user);
    const requestBody = {
      user: user?.sub,
      bookISBN: bookInformation[0],
    };
    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    fetch(
      "http://localhost:8888/.netlify/functions/database_injection",
      options
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
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
          <div className="books_container">{suggestedBooksElements}</div>
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

      <LoadAddBookPopup
        popupDisplayed={popupDisplayed[0].open}
        togglePopup={togglePopup}
        bookInformation={bookInformation}
        setBookInformation={setBookInformation}
        addBookToDB={addBookToDB}
      />
      <ScanBaracodePopup
        popupDisplayed={popupDisplayed[1].open}
        togglePopup={togglePopup}
      />
    </div>
  );
}
