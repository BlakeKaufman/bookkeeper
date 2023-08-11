import "./index.css";
import angleLeftIcon from "../../../../../../../assets/images/icons/angle-small-left.svg";
import { useEffect, useState } from "react";
export default function SubmitReadingSessionPage(props) {
  const [startPageNum, setStartPageNum] = useState(100);
  const [form, setForm] = useState([
    { name: "ePage", value: "" },
    { name: "reading_notes", value: "" },
  ]);

  function timerFormmating(value) {
    var h = Math.floor(value / 3600);
    var m = Math.floor((value % 3600) / 60);

    return `${h} hours ${m} min${m < 2 ? "" : "s"}`;
  }

  function getDate() {
    const currentDate = new Date();

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(currentDate);
  }

  function manageForm(event) {
    const targetName = event.target.name;

    setForm((prev) => {
      return prev.map((formItem) => {
        if (formItem.name === targetName)
          return { ...formItem, value: event.target.value };
        else return formItem;
      });
    });
  }

  function discardSession() {
    props.clearSettings();
    props.toggleReadingMode();
  }

  useEffect(() => {
    // set start page num by calling db
  }, [props.duration]);

  const popupStyle = {
    left: props.isDisplayed ? "0%" : "100%",
  };
  return (
    <div style={popupStyle} id="submit_reading_session_container">
      <div onClick={props.toggleSubmitPage} className="top">
        <div className="icon">
          <img src={angleLeftIcon} alt="small angle left for back button" />
        </div>
        <span>Back</span>
      </div>
      <div className="coverImage">
        <img src={props.bookCover} alt="book cover" />
      </div>
      <h1>Great Job!</h1>
      <span className="introSubtitle">
        Check out your reading session summary below.
      </span>

      <div className="sessionInformation">
        <div className="label">Date</div>
        <div className="value">{getDate()}</div>
        <div className="label">Duration</div>
        <div className="value">{timerFormmating(props.duration)}</div>
        <div className="label">Started at page</div>
        <div className="value">{startPageNum}</div>
        <div className="label">Ended at page</div>
        <input
          value={form[0].value && form[0].value}
          onChange={manageForm}
          name="ePage"
          className="value"
          placeholder="Enter here"
        ></input>
        <div className="label">Reading Notes</div>
      </div>
      <textarea
        onChange={manageForm}
        name="reading_notes"
        id="reading_notes"
        cols="30"
        rows="10"
        placeholder="Write notes here..."
        value={form[1].value && form[1].value}
      ></textarea>

      <div className="CTA_options">
        <span onClick={discardSession} className="option">
          Discard
        </span>
        <span className="option">Save</span>
      </div>
    </div>
  );
}
