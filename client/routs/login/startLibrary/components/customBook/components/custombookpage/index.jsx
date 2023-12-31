import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import closeIcon from "../../../../../../../assets/images/icons/close.svg";
import bookMark from "../../../../../../../assets/images/icons/bookmark.svg";
import book from "../../../../../../../assets/images/icons/book.svg";
import check from "../../../../../../../assets/images/icons/check.svg";
import trash from "../../../../../../../assets/images/icons/trash.svg";
import LoadReadingStatusOptions from "../../../readingStatus";
import AddBookFormValidation from "../formValidation";
import AddBookSubmitForm from "../submitForm";

const readingStatusOptions = [
  { name: "To Read", icon: bookMark, isSelected: true },
  { name: "Reading", icon: book, isSelected: false },
  { name: "Finished", icon: check, isSelected: false },
  { name: "Abandoned", icon: trash, isSelected: false },
];

export default function AddBookPopup(props) {
  const [progressType, setProgressType] = useState("pages");
  const [progreessNumber, setProgressNumber] = useState(0);
  const [readingStatus, setReadingStatus] = useState(readingStatusOptions);
  const { user } = useAuth0();
  const [formValidated, setFormValidated] = useState(false);
  const [isSubmited, setIsSubmited] = useState([false, false]);
  const [submitingPopup, setSubmitingPopup] = useState(false);

  const bookId = props.bookInformation.length != 0;
  const [formInfo, setFormInfo] = useState([
    { id: "coverImg", value: null, pos: 1 },
    {
      id: "progressType",
      value: null,
      type: "pages",
      pos: 2,
    },
    { id: "title", value: null, pos: 3 },
    { id: "author", value: null, pos: 4 },
    { id: "publisher", value: null, pos: 5 },
    { id: "publicationYear", value: null, pos: 6 },
    { id: "Categories", value: null, pos: 7 },
    { id: "isbn", value: null, pos: 8 },
    { id: "description", value: null, pos: 9 },
    {
      id: "readingStatus",
      value: readingStatus.filter((status) => status.isSelected)[0]?.name,
      pos: 9,
    },
  ]);
  console.log(formInfo);
  let progressPlacement = 0;
  let progressTypeSpan = {};

  if (progressType.toLowerCase() === "pages") {
    progressTypeSpan = { text: "Page count", isEditable: true };
    progressPlacement = 0;
  } else if (progressType.toLowerCase() === "percent") {
    progressPlacement = 100 / 3;
    progressTypeSpan = { text: "Percent", isEditable: false };
  } else {
    progressPlacement = 100 / 1.5;
    progressTypeSpan = { text: "Audiobook length (minutes)", isEditable: true };
  }

  function toggleProgressType(event) {
    const type = event.target.textContent;

    setProgressType(type);

    if (type === "Percent") setProgressNumber(100);
    else setProgressNumber(0);
  }

  function toggleFormInfo(e, pos) {
    console.log(e, pos);
    setFormInfo((prevArr) => {
      return prevArr.map((item) => {
        if (item.pos === pos) {
          if (item.pos === 2) {
            return { ...item, value: e.target.value, type: progressType };
          }
          return { ...item, value: e.target.value };
        } else return item;
      });
    });
  }

  function toggleReadingStatus(event) {
    const selectedStatus = event.target.parentElement.children[0].textContent;

    setReadingStatus((prevArr) =>
      prevArr.map((option) => {
        if (option.name === selectedStatus)
          return { ...option, isSelected: true };
        else return { ...option, isSelected: false };
      })
    );
  }

  useEffect(() => {
    if (props.bookInformation[0] === 0) return;
    fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${props.bookInformation[0]}&jscmd=details&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const bookOBJ = data[`ISBN:${props.bookInformation[0]}`];

        console.log(bookOBJ);

        setFormInfo((prevInfo) => {
          return prevInfo.map((formItem) => {
            if (formItem.id === "coverImg") {
              return { ...formItem, value: props.bookInformation[1] };
            } else if (formItem.id === "progressType") {
              setProgressNumber(bookOBJ?.details?.number_of_pages);
              return { ...formItem, value: bookOBJ?.details?.number_of_pages };
            } else if (formItem.id === "title") {
              return { ...formItem, value: bookOBJ?.details.title };
            } else if (formItem.id === "author") {
              return { ...formItem, value: bookOBJ?.details.authors?.[0].name };
            } else if (formItem.id === "publisher") {
              return { ...formItem, value: bookOBJ?.details.publishers[0] };
            } else if (formItem.id === "publicationYear") {
              return { ...formItem, value: bookOBJ?.details.publish_date };
            } else if (formItem.id === "Categories") {
              return { ...formItem, value: null };
            } else if (formItem.id === "isbn") {
              return { ...formItem, value: props.bookInformation[0] };
            } else {
              return {
                ...formItem,
                value: bookOBJ?.details?.description?.value,
              };
            }
          });
        });
      });
  }, [props.bookInformation[0]]);

  function addBookToDB() {
    console.log("added to db");
    console.log(props.bookInformation);
    console.log(user);
    console.log(formInfo);

    if (
      !props.bookInformation ||
      !user ||
      formInfo.filter((formItem) => !formItem.value).length != 0
    ) {
      setFormValidated(true);
      setSubmitingPopup(true);
      return;
    }
    setIsSubmited([true, false]);
    setSubmitingPopup(true);
    console.log("submited");

    const requestBody = {
      user: user?.sub,
      bookISBN: props.bookInformation[0],
      book: formInfo,
    };
    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    const LocalHostURL =
      "http://localhost:8888/.netlify/functions/book_injection";
    const productionURL =
      "https://lainaapp.netlify.app/.netlify/functions/book_injection";

    fetch(productionURL, options)
      .then((response) => response.json())
      .then((data) => {
        setIsSubmited([true, true]);
        console.log(data);
      });
  }

  //   styles
  const progressBarStyle = {
    left: `${progressPlacement}%`,
  };
  const popupStyle = {
    top: props.popupDisplayed ? "0" : "100%",
  };

  //   loading content

  const readingStatusElements = readingStatus.map((option) => (
    <LoadReadingStatusOptions
      name={option.name}
      iconImg={option.icon}
      isSelected={option.isSelected}
      key={option.name}
      onClick={toggleReadingStatus}
    />
  ));

  return (
    <div style={popupStyle} className="add_book_popup">
      <div className="add_book">
        <div className="topbar">
          <h1>Add book</h1>
          <div onClick={props.togglePopup} className="icon">
            <img
              src={closeIcon}
              className="customBook"
              alt="close icon to close custom book section"
            />
          </div>
        </div>
        <AddBookFormValidation
          toggleFunction={setFormValidated}
          isShown={formValidated}
          content="Please fill out all fields"
          setSubmitingPopup={setSubmitingPopup}
        />
        <AddBookSubmitForm
          isShown={isSubmited}
          toggleFunction={setIsSubmited}
          setSubmitingPopup={setSubmitingPopup}
        />

        <div
          style={{
            display: !submitingPopup ? "block" : "none",
          }}
          className="scroll_container"
        >
          <section className="cover_image options_container">
            <span className="section_title">Cover image</span>
            <div className="container">
              <div
                style={{ border: book ? "unset" : "1.5px solid black" }}
                className="upload_box"
              >
                {book && <img src={formInfo[0].value} alt={`cover image`} />}
                {!book && <span className="upload_icon">+</span>}
              </div>
              {!book && <span className="upload_span">Upload</span>}
            </div>
          </section>
          <section className="progress_type options_container">
            <span className="section_title">Progress type</span>
            <div className="container">
              <div onClick={toggleProgressType} className="type_container">
                <span className="type">Pages</span>
                <span className="type">Percent</span>
                <span className="type">Time</span>
                <div style={progressBarStyle} className="active_option"></div>
              </div>
              <div className="progress_input">
                <span className="progress_type_span">
                  {progressTypeSpan.text}
                </span>
                {progressType === "Percent" ? (
                  <input type="text" value={100} readOnly />
                ) : (
                  <input
                    type="text"
                    value={formInfo[1].value}
                    onChange={(e) => {
                      toggleFormInfo(e, 2);
                      //   setProgressNumber(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
          </section>
          <section className="book_details selection_containers options_container">
            <span className="section_title">Book details</span>
            <div className="container">
              <div className="detail">
                <span>Title</span>
                <input
                  type="text"
                  className="book_detail_input title"
                  value={`${bookId ? formInfo[2].value : "Title (Required)"}`}
                  onChange={(e) => toggleFormInfo(e, 3)}
                />
                {/* <div className="screen title"></div> */}
              </div>
              <div className="detail">
                <span>Author</span>
                <input
                  type="text"
                  className="book_detail_input title"
                  value={`${bookId ? formInfo[3].value : "Author (Required)"}`}
                  onChange={(e) => toggleFormInfo(e, 4)}
                />
              </div>
              <div className="detail">
                <span>Publisher</span>
                <input
                  type="text"
                  className="book_detail_input title"
                  value={`${bookId ? formInfo[4].value : "Publisher"}`}
                  onChange={(e) => toggleFormInfo(e, 5)}
                />
              </div>
              <div className="detail">
                <span>Publication Year</span>
                <input
                  type="text"
                  className="book_detail_input title"
                  value={`${bookId ? formInfo[5].value : "Publication year"}`}
                  onChange={(e) => toggleFormInfo(e, 6)}
                />
              </div>
              <div className="detail">
                <span>Categories</span>
                <input
                  type="text"
                  className="book_detail_input Categories"
                  placeholder="Fiction, History"
                  onChange={(e) => toggleFormInfo(e, 7)}
                />
              </div>
              <div className="detail">
                <span>ISBN</span>
                <input
                  type="text"
                  className="book_detail_input title"
                  value={`${bookId ? formInfo[7].value : "ISBN (required)"}`}
                  onChange={(e) => toggleFormInfo(e, 8)}
                />
              </div>
              <div className="detail">
                <textarea
                  className="book_detail_input Description"
                  cols="30"
                  rows="10"
                  value={`${
                    bookId
                      ? !formInfo[8].value
                        ? "Description"
                        : formInfo[8].value
                      : "Description"
                  }`}
                  onChange={(e) => toggleFormInfo(e, 9)}
                ></textarea>
              </div>
            </div>
          </section>
          <section className="reading_status selection_containers options_container">
            <span className="section_title">Reading status</span>
            <div className="container">{readingStatusElements}</div>
          </section>
        </div>
        <div onClick={addBookToDB} className="add_book_BTN">
          <span>Add to library</span>
        </div>
      </div>
    </div>
  );
}
