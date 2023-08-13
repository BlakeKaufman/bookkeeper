import "./index.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import angleLeftIcon from "../../../assets/images/icons/angle-small-left.svg";

import CategoryOption from "./components/categoryOption";
import bookMark from "../../../assets/images/icons/bookmark.svg";
import book from "../../../assets/images/icons/book.svg";
import bookShelf from "../../../assets/images/icons/books.svg";
import check from "../../../assets/images/icons/check.svg";
import trash from "../../../assets/images/icons/trash.svg";
import folderIcon from "../../../assets/images/icons/folder.svg";
import userIcon from "../../../assets/images/icons/folder.svg";
import plusIcon from "../../../assets/images/icons/plus.svg";
import LoadBooksCategorySection from "./components/categorySection";
import LoadBottomNavAdmin from "../components/bottomNav";
import LoadBookInfoPopup from "./components/bookInfoPopup";
import LoadSelectedCategoryPage from "./components/selectedCategoryPage";
import LoadAddCollectionPopup from "./components/addCollectionPopup";
import AdminTopBar from "../components/topbar";
import adminRedirect from "../../../../auth0/redirect";
import LoadAddBookPage from "../../../components/addBook";
import ReadingNowBooks from "./components/readingNowBook";

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
  adminRedirect("admin_books");
  const { user } = useAuth0();
  const [expandedBook, setExpandedBook] = useState("");

  const [userBooks, setUserBooks] = useState([]);
  const [addNewBook, setAddNewBook] = useState(0);

  const [bookInfoDiplayed, setBookInfoDisplayed] = useState(false);
  const [selectedCategoryDisplayed, setSelectedCategoryDisplayed] = useState({
    isDisplayed: false,
    text: "",
  });
  const [showCategory, setShowCategory] = useState([
    { name: "library", isDisplayed: true },
    { name: "collections", isDisplayed: false },
    { name: "categories", isDisplayed: false },
    { name: "authors", isDisplayed: false },
  ]);
  const [addCollectionPopup, setAddCollectionPopup] = useState(false);
  const [addBookPopup, setAddBookPopup] = useState(false);

  function toggleBookInfo(event) {
    setBookInfoDisplayed((prevDisplay) => !prevDisplay);
    setExpandedBook(event.target.classList[1]);
  }
  function toggleSelectedCategory(event) {
    setSelectedCategoryDisplayed((prevDisplay) => {
      return {
        isDisplayed: !prevDisplay.isDisplayed,
        text: event.target.classList.contains("screen")
          ? event.target.classList[1]
          : prevDisplay.text,
      };
    });
  }

  function toggleShowCategory(event) {
    const clickedDropdown = event.target.className;

    setShowCategory((prevOptions) =>
      prevOptions.map((option) => {
        if (option.name === clickedDropdown)
          return { ...option, isDisplayed: !option.isDisplayed };
        else return option;
      })
    );
  }

  function toggleAddCollection() {
    setAddCollectionPopup((prev) => !prev);
  }
  function toggleAddBook(event) {
    event.preventDefault();
    setAddBookPopup((prev) => !prev);
  }
  function recalUserBooks() {
    setAddNewBook((prev) => prev + 1);
  }

  const libraryElements = libraryOptions.map((option) => {
    return (
      <CategoryOption
        togglePopup={toggleSelectedCategory}
        name={option.name}
        icon={option.icon}
        key={option.name}
        userBooks={userBooks}
        containerName="library"
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
        userBooks={userBooks}
        containerName="collection"
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
        userBooks={userBooks}
        containerName="categories"
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
        userBooks={userBooks}
        containerName="author"
      />
    );
  });

  useEffect(() => {
    const userName = user?.sub ? user.sub : null;
    if (!userName) return;

    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(userName), // Convert the request body to JSON string
    };
    const localhostURL =
      "http://localhost:8888/.netlify/functions/get_user_books";

    const productionURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/get_user_books";

    fetch(localhostURL, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserBooks(data);
      });
  }, [addNewBook]);

  // dynamnic leading of books
  // reading now top section
  const readingNowBookElements = userBooks
    .filter((book) => book.book[9].value.toLowerCase() === "reading")
    .map((book, id) => {
      return (
        <ReadingNowBooks toggleBookInfo={toggleBookInfo} key={id} {...book} />
      );
    });

  // const booksAdminStyle = {
  //   overflow: bookInfoDiplayed || selectedCategoryDisplayed ? "hidden" : "auto",
  // };

  return (
    <div className="books_admin">
      <AdminTopBar
        name="Bookkeeper"
        clickEvent={toggleAddBook}
        icon={plusIcon}
      />

      <div className="books_content">
        <h1>Bookkeeper</h1>
        <section className="option_container reading_now">
          <div className="top">
            <span>Reading Now</span>
          </div>
          <div className="books_container">
            <div className="scroll_container">
              {readingNowBookElements.length === 0 && (
                <h1>You are currently reading no books</h1>
              )}
              {readingNowBookElements.length > 0 && readingNowBookElements}
            </div>
          </div>
        </section>
        {/* elemtns start */}
        <LoadBooksCategorySection
          isOpen={showCategory}
          icon={angleLeftIcon}
          name="Library"
          elements={libraryElements}
          toggleFunction={toggleShowCategory}
        />
        {/* <LoadBooksCategorySection
          isOpen={showCategory}
          icon={angleLeftIcon}
          name="Collections"
          elements={collectionElements}
          toggleFunction={toggleShowCategory}
          popupFunction={toggleAddCollection}
        /> */}
        {/* <LoadBooksCategorySection
          isOpen={showCategory}
          icon={angleLeftIcon}
          name="Categories"
          elements={categoryElements}
          toggleFunction={toggleShowCategory}
          popupFunction={toggleAddCollection}
        /> */}
        {/* <LoadBooksCategorySection
          isOpen={showCategory}
          icon={angleLeftIcon}
          name="Authors"
          elements={authorElements}
          toggleFunction={toggleShowCategory}
          popupFunction={toggleAddCollection}
        /> */}
        {/* elemtns end */}
      </div>
      <LoadBottomNavAdmin activeNav={"books"} />

      <LoadBookInfoPopup
        isDisplayed={bookInfoDiplayed}
        togglePopup={toggleBookInfo}
        book_id={expandedBook}
        books={userBooks}
        recalUserBooks={recalUserBooks}
      />
      <LoadSelectedCategoryPage
        isDisplayed={selectedCategoryDisplayed.isDisplayed}
        togglePopup={toggleSelectedCategory}
        header={selectedCategoryDisplayed.text}
        userBooks={userBooks}
        toggleBookInfo={toggleBookInfo}
        bookInfoDisplayed={bookInfoDiplayed} //adding popup z index
      />
      <LoadAddCollectionPopup
        toggleFunction={toggleAddCollection}
        isDisplayed={addCollectionPopup}
      />

      <LoadAddBookPage
        isDisplayed={addBookPopup}
        path="admin"
        toggleFunction={toggleAddBook}
        heading="Add Book"
        recalUserBooks={recalUserBooks}
      />
    </div>
  );
}
