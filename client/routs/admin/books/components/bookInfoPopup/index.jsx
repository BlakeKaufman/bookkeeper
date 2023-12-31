import { useEffect, useState } from "react";
import arrowLeft from "../../../../../assets/images/icons/angle-small-left.svg";
import playButtonIcon from "../../../../../assets/images/icons/play.svg";
import bookIcon from "../../../../../assets/images/icons/book.svg";
import clockIcon from "../../../../../assets/images/icons/clock.svg";
import arrowRightIcon from "../../../../../assets/images/icons/angle-right.svg";
import bookMark from "../../../../../assets/images/icons/bookmark.svg";
import checkIcon from "../../../../../assets/images/icons/check.svg";
import trashIcon from "../../../../../assets/images/icons/trash.svg";
import LoadReadingMode from "./components/readingmode";
import ConfirmationPopup from "../../../../../components/areYouSurePopup";

import AddRatingPopup from "./components/addRating";

export default function LoadBookInfoPopup(props) {
  const [bookInformation, setBookInformation] = useState({});

  const [readingMode, setReadingMode] = useState(false);
  const [changeReadingType, setChangeReadingType] = useState([]);
  const [libraryType, setLibraryType] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [navBar, setNavBar] = useState(null);
  const [addRating, setAddRating] = useState(false);
  const [realoadPage, setReloadPage] = useState(0);

  const [rating, setRating] = useState(null);

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const bookInfoStyle = {
    overflow: readingMode ? "hidden" : "hidden scroll",
    left: props.isDisplayed ? "0" : "100%",
  };

  function toggleReadingMode() {
    setReadingMode((prev) => !prev);
  }
  function toggleAddRating() {
    setAddRating((prev) => !prev);
  }

  function toggleLibraryType(event) {
    event.stopPropagation();
    let targetType = event.target.classList[1];
    if (targetType === "ToRead") {
      targetType = "To Read";
    }
    setChangeReadingType((prev) => {
      return prev.map((type) => {
        if (type.name === targetType)
          return {
            ...type,
            isSelected: type.isSelected ? true : !type.isSelected,
          };
        else return { ...type, isSelected: false };
      });
    });

    toggleSubmitPopup();
    // add confirmation popup
    // send update to DB
    // reaload page when update is confirmed which means add a peram to useeffect
  }

  function toggleReadingDropdown(event) {
    if (event.target.classList.contains("readingMode")) setLibraryType(true);
    else setLibraryType(false);
  }

  useEffect(() => {
    if (!props.book_id) return;
    const [selectedBook] = props.books.filter(
      (book) => book._id === props.book_id
    );

    setBookInformation(selectedBook);
    setRating(selectedBook.bookRating ? selectedBook.bookRating : 0);
    setChangeReadingType([
      {
        name: "dropdown",
        isDisplayed: false,
      },
      {
        name: "To Read",
        alt_name: "ToRead",
        isSelected:
          !isObjEmpty(selectedBook) &&
          selectedBook.book[9].value === "To Read" &&
          true,
        img: bookMark,
      },
      {
        name: "Reading",
        isSelected:
          !isObjEmpty(selectedBook) &&
          selectedBook.book[9].value === "Reading" &&
          true,
        img: bookIcon,
      },
      {
        name: "Finished",
        isSelected:
          !isObjEmpty(selectedBook) &&
          selectedBook.book[9].value === "Finished" &&
          true,
        img: checkIcon,
      },
      {
        name: "Abandoned",
        isSelected:
          !isObjEmpty(selectedBook) &&
          selectedBook.book[9].value === "Abanonded" &&
          true,
        img: trashIcon,
      },
    ]);
  }, [props.book_id, realoadPage]);

  const readingTypeDropdownElements = changeReadingType.map((type, id) => {
    if (id === 0) return;
    return (
      <li key={id}>
        <div className="list-icon">
          {type.isSelected && <img src={checkIcon} alt="check icon" />}
        </div>

        {type.name}
        <div className="list-icon">
          <img src={type.img} alt="icon" />
        </div>
        <div
          className={`screen ${type.alt_name ? type.alt_name : type.name}`}
        ></div>
      </li>
    );
  });

  if (!bookInformation.book) return;

  const sessionElements =
    bookInformation.readingSessions &&
    bookInformation.readingSessions.map((session, id) => {
      return (
        <div key={id} className="session">
          <div className="icon">
            <img src={clockIcon} alt="clock icon for reading session" />
          </div>
          <span>{session.date.split(",").slice(0, 2).join(",")}</span>
          <span>{session.duration}</span>
          <div className="icon">
            <img src={arrowRightIcon} alt="angle right icon" />
          </div>
        </div>
      );
    });

  function toggleSubmitPopup() {
    setConfirmationPopup((prev) => !prev);
  }
  function changeNav() {
    const bookFactsContainer = document
      .querySelector(".book_facts")
      .getBoundingClientRect();
    const cardsSection = document
      .querySelector(".cards")
      .getBoundingClientRect();
    const trendsSection = document
      .querySelector(".stats_trends")
      .getBoundingClientRect();
    const aboutSectoin = document
      .querySelector(".about")
      .getBoundingClientRect();
    const readingSessions = document
      .querySelector(".reading_sessions")
      .getBoundingClientRect();

    const elementsArr = [
      { element: bookFactsContainer, name: "Book" },
      { element: cardsSection, name: "Cards" },
      { element: trendsSection, name: "Trends" },
      { element: aboutSectoin, name: "About" },
      { element: readingSessions, name: "Sessions" },
    ];
    let activeNav;

    const filteredActiveNav = elementsArr
      .map((element) => {
        return { ...element, top: element.element.top };
      })
      .sort((a, b) => a.top - b.top)
      .filter((item) => item.top <= 65);

    if (filteredActiveNav.length === 0) {
      activeNav = elementsArr[0];
    } else {
      activeNav = filteredActiveNav[filteredActiveNav.length - 1];
    }

    const barProperties = [
      ...document.querySelector(".bookInfoPopupNav").children,
    ]
      .filter((child) => child.innerHTML === activeNav.name)[0]
      .getBoundingClientRect();

    const containerMargin = document
      .querySelector(".bookInfoPopupNav")
      .getBoundingClientRect().x;

    console.log(barProperties);

    const barStyling = {
      width: barProperties.width,
      left: `${barProperties.x - containerMargin}px`,
    };

    setNavBar(
      <>
        <li
          className={`nav_item ${
            activeNav.name === "Book" ? "active_item" : ""
          }`}
        >
          Book
        </li>
        <li
          className={`nav_item ${
            activeNav.name === "Cards" ? "active_item" : ""
          }`}
        >
          Cards
        </li>
        <li
          className={`nav_item ${
            activeNav.name === "Trends" ? "active_item" : ""
          }`}
        >
          Trends
        </li>
        <li
          className={`nav_item ${
            activeNav.name === "Sessions" ? "active_item" : ""
          }`}
        >
          Sessions
        </li>
        <li
          className={`nav_item ${
            activeNav.name === "About" ? "active_item" : ""
          }`}
        >
          About
        </li>
        <div style={barStyling} className="underline"></div>
      </>
    );
  }

  function submitChange() {
    const id = bookInformation._id;
    const [readingStatus] = changeReadingType.filter((type) => {
      return type.isSelected;
    });

    const newBook = bookInformation.book.map((item, id) => {
      if (item.pos != 10) return item;
      else return { ...item, value: readingStatus.name };
    });

    const requestBody = {
      _id: id,
      book: newBook,
    };

    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    const localHostURl =
      "http://localhost:8888/.netlify/functions/update_library_type";
    const productionHostURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/update_library_type";

    fetch(productionHostURL, options)
      .then((response) => response.json())
      .then((data) => {
        props.recalUserBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function calcTotalReadingTime() {
    if (!bookInformation.readingSessions) return "N/A";
    let totalReadingTime = bookInformation.readingSessions.reduce(
      (acc, curr) => {
        const duration = curr.duration.split(" ");
        const hours = Number(duration[0]) * 60;
        const min = Number(duration[2]);

        return acc + min + hours;
      },
      0
    );

    if (totalReadingTime > 60) {
      return `${Math.floor(totalReadingTime / 60)} h ${
        totalReadingTime % 60
      } m`;
    } else {
      return `0 h ${totalReadingTime} m`;
    }
  }

  function pagesRead() {
    return bookInformation.readingSessions
      ? bookInformation.readingSessions[
          bookInformation.readingSessions.length - 1
        ].finish
      : "N/A";
  }

  function readingSpeed(type) {
    if (calcTotalReadingTime() === "N/A") return "N/A";
    const totalTimeRead = calcTotalReadingTime().split(" ");
    const hours = totalTimeRead[0];
    const min = totalTimeRead[2];
    const toatlPages = pagesRead();
    if (type === "min" && toatlPages != "N/A") {
      return (toatlPages / (hours * 60 + min)).toFixed(2);
    } else if (type === "hours" && toatlPages != "N/A") {
      if (hours === 0) {
        return (toatlPages * (60 / min)).toFixed(2);
      } else {
        return (toatlPages / (hours + min / 60)).toFixed(2);
      }
    }
  }

  function estTimeLeft() {
    const pagesPerMin = readingSpeed("min");
    const totalPages = Number(bookInformation.book[1].value);
    const pgRead = pagesRead();
    const minLeft = ((totalPages - pgRead) / pagesPerMin).toFixed(2);

    if (pgRead === "N/A") return "N/A";
    return `${Math.floor(minLeft / 60)} h ${(minLeft % 60).toFixed(2)} m`;
  }

  const libraryTypeDropdownStyle = {
    display: libraryType ? "block" : "none",
  };

  return (
    <section
      onScroll={changeNav}
      onClick={toggleReadingDropdown}
      style={bookInfoStyle}
      className="book_info_popup"
    >
      <div className="topbar">
        <div className="top">
          <div onClick={props.togglePopup} className="back_button">
            <div className="icon">
              <img src={arrowLeft} alt="angle right for back button" />
            </div>
            <span>Back</span>
          </div>
          <span className="book_tittle">
            <span>{bookInformation.book[2].value}</span>
          </span>
          <span>+</span>
          <div className="icon"></div>
        </div>
        <ul className="nav_container bookInfoPopupNav">
          {navBar}
          {!navBar && (
            <>
              <li className="nav_item active_item">Book</li>
              <li className="nav_item">Cards</li>
              <li className="nav_item">Trends</li>
              <li className="nav_item">Sessions</li>
              <li className="nav_item">About</li>
              <div className="underline"></div>
            </>
          )}
        </ul>
      </div>
      <section className="selected_book">
        <div className="img">
          <img src={bookInformation?.book[0].value} alt="book cover" />
        </div>
        <h2>{bookInformation?.book[2].value}</h2>
        <span className="author_name">{bookInformation?.book[3].value}</span>
        <div className="book_options">
          <div onClick={toggleReadingMode} className="option">
            <div className="icon">
              <img src={playButtonIcon} alt="play button for reading mode" />
            </div>
            <span>Reading Mode</span>
          </div>
          <div className="option">
            <div className="icon">
              <img
                src={changeReadingType.filter((type) => type.isSelected)[0].img}
                alt="books icon for category selector"
              />
            </div>
            <ul
              style={libraryTypeDropdownStyle}
              onClick={toggleLibraryType}
              className="options_container"
            >
              {readingTypeDropdownElements}
            </ul>

            <span>
              {changeReadingType.filter((type) => type.isSelected)[0].name}
            </span>
            <div className="screen readingMode"></div>
          </div>
        </div>
      </section>
      <section className="book_facts">
        <div className="slice"></div>
        <div className="basic_infos">
          <div className="info">
            <span>First Read</span>
            <span>
              {bookInformation.readingSessions &&
                bookInformation.readingSessions[0].date
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              {!bookInformation.readingSessions && "N/A"}
            </span>
          </div>
          <div className="info">
            <span>Last Read</span>
            <span>
              {bookInformation.readingSessions &&
                bookInformation.readingSessions[
                  bookInformation.readingSessions.length - 1
                ].date
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              {!bookInformation.readingSessions && "N/A"}
            </span>
          </div>
          <div onClick={toggleAddRating} className="info">
            <span>Rating</span>
            <span>
              {rating
                ? rating != "0.0"
                  ? rating.toFixed(1) + "/5.0"
                  : "Add Rating"
                : "Add Rating"}
            </span>
          </div>
        </div>
        <div className="cards facts_container">
          <div className="top">
            <h1>Cards</h1>
            <span className="num_cards">0</span>
            <span>Edit</span>
          </div>
          <div className="scroll_container">
            <ul className="nav_container">
              <li className="nav_item active_nav">Sort</li>
              <li className="nav_item active_nav">All Cards</li>
              <li className="nav_item">Starred</li>
              <li className="nav_item">Notes</li>
              <li className="nav_item">Clash Cards</li>
              <li className="nav_item">Quotes</li>
              <li className="nav_item">Definishions</li>
            </ul>
          </div>
          <div className="cards_container">
            <div className="no_cards">
              <div className="icon"></div>
              <span>No Cards</span>
              <span>
                Add cards using the + button and they will appear here.
              </span>
            </div>
          </div>
        </div>
        <div className="stats_trends facts_container">
          <div className="top">
            <h1>Stats & Trends</h1>
          </div>
          <div className="stats_container">
            {/* <div className="nav">
              <span>Pages Read</span>
              <span>Reading Time</span>
              <div className="background"></div>
            </div> */}
            <div className="graph">GRAPH</div>
            <div className="stats">
              <div>
                <span>Total Time</span>
                <span>{calcTotalReadingTime()}</span>
              </div>
              <div>
                <span>Est. time left</span>
                <span>{estTimeLeft()}</span>
              </div>
              <div>
                <span>Pages read</span>
                <span>
                  {bookInformation.readingSessions
                    ? bookInformation.readingSessions[
                        bookInformation.readingSessions.length - 1
                      ].finish
                    : "N/A"}
                </span>
              </div>
              <div>
                <span>Longest streak</span>
                <span>N/A</span>
              </div>
              <div>
                <span>Pages/hour</span>
                <span>{readingSpeed("hours")}</span>
              </div>
              <div>
                <span>Pages/min</span>
                <span>{readingSpeed("min")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="reading_sessions facts_container">
          <div className="top">
            <h1>Reading Sessions</h1>
            <span className="num_sessions">
              {sessionElements ? sessionElements.length : 0}
            </span>
          </div>
          <div className="sessions_container">
            {/* <div className="session">
              <div className="icon">
                <img src={clockIcon} alt="clock icon for reading session" />
              </div>
              <span>July 24, 2023</span>
              <span>30m</span>
              <span>++</span>
            </div> */}
            {!sessionElements && <span>No reading sessions yet.</span>}
            {sessionElements}
          </div>
        </div>
        <div className="about facts_container">
          <div className="top">
            <h1>About</h1>
          </div>
          <div className="about_container">
            <span className="description">{bookInformation.book[8].value}</span>
            <div className="grid_information">
              <span>Publisher</span>
              <span>{bookInformation.book[4].value}</span>

              <span>Published</span>
              <span>{bookInformation.book[5].value}</span>

              <span>ISBN</span>
              <span>{bookInformation.book[7].value}</span>

              <span>Pages</span>
              <span>{bookInformation.book[1].value}</span>

              <span>Category</span>
              <span>{bookInformation.book[6].value}</span>
            </div>
          </div>
        </div>

        <a className="buy_CTA">Buy on Amazon</a>
      </section>

      <LoadReadingMode
        isDisplayed={readingMode}
        toggleReadingMode={toggleReadingMode}
        bookCover={bookInformation.book[0].value}
        book={bookInformation}
        recalUserBooks={props.recalUserBooks}
      />
      <ConfirmationPopup
        isDisplayed={confirmationPopup}
        from="changeLibraryOptions"
        continueText="Submit"
        cancelFunction={toggleSubmitPopup}
        title="Confirm"
        subTitle="Are you sure you want to submit this change?"
        submitChange={submitChange}
      />
      <AddRatingPopup
        isDisplayed={addRating}
        toggleAddRating={toggleAddRating}
        bookInformation={bookInformation}
        realoadPage={props.recalUserBooks}
        setRating={setRating}
        rating={rating}
        setReloadPage={setReloadPage}
      />
    </section>
  );
}
