import angleLeft from "../../../../../assets/images/icons/angle-small-left.svg";

import sortIcon from "../../../../../assets/images/icons/sort-alt.svg";
import booksIcon from "../../../../../assets/images/icons/books.svg";

import toReadIcon from "../../../../../assets/images/icons/bookmark.svg";

import readingNowIcon from "../../../../../assets/images/icons/book.svg";

import finishedIcon from "../../../../../assets/images/icons/check.svg";

import abandonedIcon from "../../../../../assets/images/icons/trash.svg";

import { useEffect, useState } from "react";

export default function LoadSelectedCategoryPage(props) {
  const [categoryBooks, setCategoryBooks] = useState([]);

  const filterdBooksStyle = {
    left: props.isDisplayed && !props.bookInfoDisplayed ? "0" : "100%",
  };

  function formatHeader(head) {
    return head.includes("_")
      ? head.split("_").join(" ").charAt(0).toUpperCase() +
          head.split("_").join(" ").slice(1)
      : head.charAt(0).toUpperCase() + head.slice(1);
  }

  useEffect(() => {
    let selectedCategoryBooks;
    const compareCategory =
      formatHeader(props.header) === "Reading Now"
        ? "Reading"
        : formatHeader(props.header);
    if (props.header === "Library") selectedCategoryBooks = props.userBooks;
    else
      selectedCategoryBooks = props.userBooks.filter(
        (book) =>
          book.book[9].value.toLowerCase() === compareCategory.toLowerCase()
      );

    setCategoryBooks(selectedCategoryBooks);
  }, [props.header]);

  const bookElements = categoryBooks.map((book, id) => {
    let imageIcon;
    let fillWidth;
    const pagesRead = 100; // get info from database when I add that feature
    const totalPages = book.book[1].value;
    switch (book.book[9].value) {
      case "To Read":
        imageIcon = toReadIcon;
        break;
      case "Reading":
        imageIcon = readingNowIcon;
        break;
      case "Finished":
        imageIcon = finishedIcon;
        // make calculation off of toal book pages read in database entry when I add that
        fillWidth = (pagesRead / totalPages) * 100; // book length pages

        break;
      case "Abandoned":
        imageIcon = abandonedIcon;
        break;
      default:
        break;
    }

    const fillStyle = {
      width: fillWidth,
    };

    return (
      <div key={id} className={`book `}>
        <div className="cover_img">
          <img src={book.book[0].value} alt="book cover image" />
        </div>
        <div className="info_container">
          <span>{book.book[2].value}</span>
          <span>{book.book[3].value}</span>
          {book.book[9].value === "Reading" && (
            <div className="progress_container">
              <div className="progress_bar">
                <div style={fillStyle} className="fill"></div>
              </div>
              <span>
                {pagesRead}/{totalPages} pages
              </span>
            </div>
          )}
        </div>
        <div className="icon">
          <img src={imageIcon} alt="icon to differentiate book categories" />
        </div>
        <div
          onClick={props.toggleBookInfo}
          className={`screen ${book._id}`}
        ></div>
      </div>
    );
  });

  return (
    <section style={filterdBooksStyle} className="filtered_books_page">
      <div className="top">
        <div onClick={props.togglePopup} className="back_container">
          <div className="icon">
            <img src={angleLeft} alt="angle small left to show back event" />
          </div>
          <span>Bookkeeper</span>
        </div>
        {/* <span>+</span>
        <span>(-)</span> */}
      </div>
      <h1>{formatHeader(props.header)}</h1>
      {/* <!-- title of box clicked --> */}
      <input
        type="text"
        name="#"
        id="#"
        placeholder="Search by title or author"
      />
      <div className="filter_container">
        <span>
          {bookElements.length} Book{bookElements.length > 1 && "s"}
        </span>
        <div className="sort">
          <div className="text_container">
            <span>Sort</span>
            <div className="icon">
              <img src={sortIcon} alt="sort icon for book sorting" />
            </div>
          </div>
          <div className="options"></div>
        </div>
      </div>
      <div className="books_container">
        {bookElements.length === 0 && (
          <div className="is_empty_container">
            <div className="icon">
              <img
                src={booksIcon}
                alt="book icon to show there are no books in this collection"
              />
            </div>
            <span>This collection is empty</span>
            <span>Add books by searching, scanning, or creating your own.</span>
            <span>Add a new book</span>
          </div>
        )}
        {bookElements.length != 0 && bookElements}
        {/* <div className="book">
          <div className="cover_img"></div>
          <div>
            <span>The Fifth Miracle</span>
            <span>Author</span>
          </div>
          <div className="icon"></div>
        </div> */}
      </div>
    </section>
  );
}
