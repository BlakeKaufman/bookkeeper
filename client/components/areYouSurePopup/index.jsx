import "./index.css";

export default function ConfirmationPopup(props) {
  function discard() {
    props.cancelFunction();
    props.clearSettings();
    props.toggleReadingMode();
  }
  function cancel() {
    props.cancelFunction();
  }
  const popupStyling = {
    zIndex: props.isDisplayed ? "99" : "-1",
    opacity: props.isDisplayed ? "1" : "0",
  };

  return (
    <div style={popupStyling} id="areYouSure">
      <div className="content">
        <h1>{props.title}</h1>
        <span className="subTitle">{props.subTitle}</span>

        <div className="options">
          <span onClick={discard} className="discardBTN BTN">
            Discard
          </span>
          <span onClick={cancel} className="cancelBTN BTN">
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
}
