import arrowLeftIcon from "../../../../../assets/images/icons/angle-small-left.svg";

import "./index.css";

export default function LoadSettingsPopup(props) {
  const conatainerPopupStyle = {
    left: props.isDisplayed ? "0%" : "100%",
  };
  return (
    <div style={conatainerPopupStyle} className="settinsPopup">
      <div className="top">
        <div onClick={props.toggleSettings} className="content">
          <div className="icon">
            <img src={arrowLeftIcon} alt="arrow left icon" />
          </div>
          <span>Stats</span>
        </div>
        <span>Settings</span>
      </div>
    </div>
  );
}
