import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import adminRedirect from "../../../../auth0/redirect";

import LoadBottomNavAdmin from "../components/bottomNav";
import AdminTopBar from "../components/topbar";

import plusIcon from "../../../assets/images/icons/plus.svg";

import "./index.css";
import NoteBookLine from "./components/line";

import LoadWishlistBookInput from "./components/bookInputPupup";

export default function LoadWishlistAdmin() {
  adminRedirect("admin_wishlist");
  const { user } = useAuth0();
  const [bookList, setBookList] = useState([]);
  const [addBookPopup, setAddBookPopup] = useState(false);
  const [realoadPage, setReloadPage] = useState(0);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const [removingBooks, setRemovingBooks] = useState([]);

  useEffect(() => {
    if (!user?.sub) return;
    //    setting book list
    const localHostURl =
      "http://localhost:8888/.netlify/functions/get_wishlist_books";
    const productionURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/get_wishlist_books";

    const requestBody = {
      user: user.sub,
    };
    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    fetch(localHostURl, options)
      .then((response) => response.json())
      .then((data) => {
        const [descructuredData] = data;

        if (descructuredData) {
          setBookList(descructuredData.wishlist);
          let removingBook = [];
          descructuredData.wishlist.forEach((element, id) => {
            removingBook.push({ pos: id, isSelected: false });
          });

          setRemovingBooks(removingBook);
        }
      });
  }, [realoadPage]);

  function addBookToBookList() {
    setAddBookPopup((prev) => !prev);
  }

  function editFunction() {
    if (isInEditMode) {
      // update list
      const removedBookIndex = removingBooks.map((book) => {
        if (book.isSelected) return book.pos;
      });

      const newBookList = bookList
        .map((book, id) => {
          if (removedBookIndex.indexOf(id) == -1) return book;
        })
        .filter((book) => book);

      if (JSON.stringify(bookList) == JSON.stringify(newBookList)) {
        setIsInEditMode(false);
        return;
      }

      const localHostURl =
        "http://localhost:8888/.netlify/functions/wishlist_update";
      const productionURL =
        "https://bookkeeperwebsite.netlify.app/.netlify/functions/wishlist_update";

      const requestBody = {
        user: user.sub,
        wishlist: newBookList,
      };
      const options = {
        method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON string
      };
      fetch(localHostURl, options)
        .then((response) => response.json())
        .then((data) => {
          setIsInEditMode(false);
          setReloadPage((prev) => (prev += 1));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsInEditMode(true);
    }
  }

  function removingBooksSelector(event) {
    const targetEvent = event.target;

    setRemovingBooks((prev) => {
      return prev.map((element) => {
        if (element.pos == targetEvent.classList[1])
          return { ...element, isSelected: !element.isSelected };
        else return element;
      });
    });
  }

  function formatNoteBook() {
    let addedLines = [];
    const NOTEBOOKHEIGHT = window.innerHeight - 115 - 130;
    // 115 is the margin
    // 130 is the h1 and add book button
    const LINEHEIGHT = 40;

    if (LINEHEIGHT * bookList.length < NOTEBOOKHEIGHT) {
      const addedLinesNum =
        Math.round(
          (NOTEBOOKHEIGHT - LINEHEIGHT * bookList.length) / LINEHEIGHT
        ) - 1;

      for (let i = 1; i <= addedLinesNum; i++) {
        addedLines.push(<NoteBookLine key={`added${i}`} />);
      }
    }

    const noteBookElements = bookList.map((item, id) => {
      return (
        <NoteBookLine
          isRemovable={isInEditMode}
          posInArr={String(id)}
          key={id}
          book={item}
          removingBookFunction={removingBooksSelector}
          removingBooks={removingBooks}
        />
      );
    });
    return noteBookElements.concat(addedLines);
  }

  return (
    <div className="wishlist_admin">
      <AdminTopBar
        icon={plusIcon}
        name="Wishlist"
        clickEvent={addBookToBookList}
        editFunction={editFunction}
        isInEditMode={isInEditMode}
      />

      <div className="wishlist_content">
        <h1>Wishlist</h1>
        <div className="note_book">
          <div className="content">
            {/* mandatory style lines */}
            <div className="line">
              <div className="sidebar">
                <div className="dot"></div>
              </div>
            </div>
            {/* mandatory style lines */}
            {formatNoteBook()}
          </div>
        </div>

        <div
          onClick={() => {
            !isInEditMode && addBookToBookList();
          }}
          className="addBook"
        >
          <span>Add Book</span>
        </div>
      </div>

      <LoadBottomNavAdmin activeNav="wishlist" />
      <LoadWishlistBookInput
        isDisplayed={addBookPopup}
        togglePopup={addBookToBookList}
        user={user}
        bookList={bookList}
        setReloadPage={setReloadPage}
      />
    </div>
  );
}
