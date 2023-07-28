import "./index.css";
import { useState } from "react";

import angleRightIcon from "../../../assets/images/icons/angle-right.svg";

import CategoryOption from "./components/categoryOption";
import bookMark from "../../../assets/images/icons/bookmark.svg";
import book from "../../../assets/images/icons/book.svg";
import bookShelf from "../../../assets/images/icons/books.svg";
import check from "../../../assets/images/icons/check.svg";
import trash from "../../../assets/images/icons/trash.svg";
import folderIcon from "../../../assets/images/icons/folder.svg";
import userIcon from "../../../assets/images/icons/folder.svg";
import LoadBooksCategorySection from "./components/categorySection";
import LoadBottomNavAdmin from "../components/bottomNav";
import LoadBookInfoPopup from "./components/bookInfoPopup";
import LoadSelectedCategoryPage from "./components/selectedCategoryPage";

const libraryOptions = [
  { name: "Library", icon: bookShelf },
  { name: "To Read", icon: book },
  { name: "Reading Now", icon: bookMark },
  { name: "Finished", icon: check },
  { name: "Abandoned", icon: trash },
];
const collectionOptions = [{ name: "Testing", icon: null }]; //get pulled from database based on users collections
const categoryOptions = [
  { name: "Coming Of age", icon: folderIcon },
  { name: "History", icon: folderIcon },
]; //get pulled from database based on users collections
const authorOptions = [
  { name: "David Grann", icon: userIcon },
  { name: "Unknown", icon: userIcon },
]; //get pulled from database based on users collections

export default function LoadAdminBooks() {
  const [bookInfoDiplayed, setBookInfoDisplayed] = useState(false);
  const [selectedCategoryDisplayed, setSelectedCategoryDisplayed] =
    useState(false);
  function toggleBookInfo() {
    setBookInfoDisplayed((prevDisplay) => !prevDisplay);
  }
  function toggleSelectedCategory() {
    setSelectedCategoryDisplayed((prevDisplay) => !prevDisplay);
  }

  console.log(selectedCategoryDisplayed);
  const libraryElements = libraryOptions.map((option) => {
    return (
      <CategoryOption
        togglePopup={toggleSelectedCategory}
        name={option.name}
        icon={option.icon}
        key={option.name}
      />
    );
  });

  const collectionElements = collectionOptions.map((option) => {
    return (
      <CategoryOption
        togglePopup={toggleSelectedCategory}
        name={option.name}
        icon={option.icon}
        key={option.name}
      />
    );
  });
  const categoryElements = categoryOptions.map((option) => {
    return (
      <CategoryOption
        togglePopup={toggleSelectedCategory}
        name={option.name}
        icon={option.icon}
        key={option.name}
      />
    );
  });
  const authorElements = authorOptions.map((option) => {
    return (
      <CategoryOption
        togglePopup={toggleSelectedCategory}
        name={option.name}
        icon={option.icon}
        key={option.name}
      />
    );
  });

  const booksAdminStyle = {
    overflow: bookInfoDiplayed || selectedCategoryDisplayed ? "hidden" : "auto",
  };

  return (
    <div style={booksAdminStyle} className="books_admin">
      <div className="top_bar">
        <div className="content_container">
          <span>Edit</span>
          <span className="selected_nav">Bookkeeper</span>
          <span>+</span>
        </div>
        {/* <!-- needs to be conditialy renderd --> */}
      </div>
      <div className="books_content">
        <h1>Bookkeeper</h1>
        <section className="option_container reading_now">
          <div className="top">
            <span>Reading Now</span>
            <div className="icon"></div>
          </div>
          <div className="books_container">
            <div className="scroll_container">
              <div onClick={toggleBookInfo} className="book 1">
                {/* the 1 is the book id */}
                <div className="img">
                  <img src="" alt="" />
                </div>
                <span className="pages_left">100pg left</span>
                <div className="bar">
                  <div className="fill"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* elemtns start */}
        <LoadBooksCategorySection name="Library" elements={libraryElements} />
        <LoadBooksCategorySection
          name="Collections"
          elements={collectionElements}
        />
        <LoadBooksCategorySection
          name="Categories"
          elements={categoryElements}
        />
        <LoadBooksCategorySection name="Authors" elements={authorElements} />
        {/* elemtns end */}
      </div>
      <LoadBottomNavAdmin />

      <LoadBookInfoPopup
        isDisplayed={bookInfoDiplayed}
        togglePopup={toggleBookInfo}
      />
      <LoadSelectedCategoryPage
        isDisplayed={selectedCategoryDisplayed}
        togglePopup={toggleSelectedCategory}
      />
    </div>
  );
}
