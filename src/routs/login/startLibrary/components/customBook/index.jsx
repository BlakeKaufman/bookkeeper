import { useState } from "react";
import "./index.css";

import closeIcon from "../../../../../assets/images/icons/close.svg";
import bookMark from "../../../../../assets/images/icons/bookmark.svg";
import book from "../../../../../assets/images/icons/book.svg";
import check from "../../../../../assets/images/icons/check.svg";
import trash from "../../../../../assets/images/icons/trash.svg";
import LoadReadingStatusOptions from "../readingStatus";

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
              alt="close icon to close custom book section"
            />
          </div>
        </div>
        <div className="scroll_container">
          <section className="cover_image options_container">
            <span className="section_title">Cover image</span>
            <div className="container">
              <div className="upload_box">
                <span className="upload_icon">+</span>
              </div>
              <span className="upload_span">Upload</span>
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
                    value={progreessNumber}
                    onChange={(e) => setProgressNumber(e.target.value)}
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
                  placeholder="Title (Required)"
                />
                {/* <div className="screen title"></div> */}
              </div>
              <div className="detail">
                <span>Author</span>
                <input
                  type="text"
                  className="book_detail_input Author"
                  placeholder="Author (Required)"
                />
              </div>
              <div className="detail">
                <span>Publisher</span>
                <input
                  type="text"
                  className="book_detail_input Publisher"
                  placeholder="Publisher"
                />
              </div>
              <div className="detail">
                <span>Publication Year</span>
                <input
                  type="number"
                  className="book_detail_input Publication"
                  placeholder="Publication year"
                />
              </div>
              <div className="detail">
                <span>Categories</span>
                <input
                  type="text"
                  className="book_detail_input Categories"
                  placeholder="Categories"
                />
              </div>
              <div className="detail">
                <span>ISBN</span>
                <input
                  type="text"
                  className="book_detail_input ISBN"
                  placeholder="ISBN"
                />
              </div>
              <div className="detail">
                <textarea
                  className="book_detail_input Description"
                  cols="30"
                  rows="10"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </section>
          <section className="reading_status selection_containers options_container">
            <span className="section_title">Reading status</span>
            <div className="container">{readingStatusElements}</div>
          </section>
        </div>
        <div className="add_book_BTN">
          <span>Add to library</span>
        </div>
      </div>
    </div>
  );
}
