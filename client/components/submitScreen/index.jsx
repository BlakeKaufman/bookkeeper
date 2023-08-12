import "./index.css";

import checkIcon from "../../assets/images/icons/check.svg";
import { useEffect } from "react";

export default function SubmitScreen(props) {
  useEffect(() => {
    if (!props.isDisplayed) return;
    setTimeout(() => {
      props.setEndingScreen({
        popup: false,
        submited: false,
        loading: false,
      });
      props.setForm([
        { name: "ePage", value: "" },
        { name: "reading_notes", value: "" },
      ]);
      props.clearSettings();
      props.toggleReadingMode();
    }, 2000);
  }, [props.isDisplayed]);
  const displayStyle = {
    display: props.isDisplayed ? "flex" : "none",
  };
  return (
    <div style={displayStyle} className="sumbitContainer">
      <div className="icon">
        <img src={checkIcon} alt="check mark" />
      </div>
      <span className="sumbitText">Submitted!</span>
    </div>
  );
}
