import "./index.css";
import angleLeftIcon from "../../../../../../../assets/images/icons/angle-small-left.svg";
import { useEffect, useState } from "react";
import ConfirmationPopup from "../../../../../../../components/areYouSurePopup";
import SubmitScreen from "../../../../../../../components/submitScreen";
import LoadingAnimation from "../../../../../../../components/loadingAnimation";
export default function SubmitReadingSessionPage(props) {
  const [startPageNum, setStartPageNum] = useState(100);
  const [form, setForm] = useState([
    { name: "ePage", value: "" },
    { name: "reading_notes", value: "" },
  ]);
  const [confirmation, setConfirmation] = useState(false);
  const [endingScreen, setEndingScreen] = useState({
    popup: false,
    submited: false,
    loading: false,
  });

  function sPageNum() {
    const readingSessions = props.book.readingSessions;
    if (!readingSessions) return "0";
    return readingSessions[readingSessions.length - 1].finish;
  }

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

  function toggleDiscardConfirmation() {
    setConfirmation((prev) => !prev);
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

  function submitSession() {
    const readingSessions = props.book.readingSessions;
    console.log(readingSessions, "TT");
    const newArr = [];
    const id = props.book._id;
    const data = {
      date: getDate(),
      duration: timerFormmating(props.duration),
      start: sPageNum(),
      finish: form[0].value ? form[0].value : sPageNum(),
      notes: form[1].value,
    };

    newArr.push(data);

    const requestBody = {
      _id: id,
      readingSessions: readingSessions
        ? readingSessions.concat(newArr)
        : newArr,
    };

    setEndingScreen({
      popup: true,
      submited: false,
      loading: true,
    });

    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    const localHostURl =
      "http://localhost:8888/.netlify/functions/reading_session";

    const productionURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/reading_session";

    fetch(productionURL, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.recalUserBooks();
        setEndingScreen({
          popup: true,
          submited: true,
          loading: false,
        });
      });
  }

  useEffect(() => {
    // set start page num by calling db
  }, [props.duration]);

  const popupStyle = {
    left: props.isDisplayed ? "0%" : "100%",
  };
  const finishStyle = {
    opacity: endingScreen.popup ? "1" : "0",
    zIndex: endingScreen.popup ? "98" : "-1",
  };
  return (
    <div style={popupStyle} id="submit_reading_session_container">
      <div className="top">
        <div className="icon">
          <img src={angleLeftIcon} alt="small angle left for back button" />
        </div>
        <span onClick={props.toggleSubmitPage}>Back</span>
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
        <div className="value">{sPageNum()}</div>
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
        <span onClick={toggleDiscardConfirmation} className="option">
          Discard
        </span>
        <span onClick={submitSession} className="option">
          Save
        </span>
      </div>
      <ConfirmationPopup
        title="Confirm"
        subTitle="Are you sure you want to discard this reading session?"
        isDisplayed={confirmation}
        cancelFunction={toggleDiscardConfirmation}
        clearSettings={props.clearSettings}
        toggleReadingMode={props.toggleReadingMode}
      />
      <div style={finishStyle} className="endingReadingSessionContainer">
        <SubmitScreen
          isDisplayed={endingScreen.submited}
          setEndingScreen={setEndingScreen}
          clearSettings={props.clearSettings}
          toggleReadingMode={props.toggleReadingMode}
          setForm={setForm}
        />
        <LoadingAnimation isDisplayed={endingScreen.loading} />
      </div>
    </div>
  );
}
