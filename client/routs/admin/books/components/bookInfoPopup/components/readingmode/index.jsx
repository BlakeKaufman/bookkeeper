import playIcon from "../../../../../../../assets/images/icons/play.svg";
import pauseIcon from "../../../../../../../assets/images/icons/pause.svg";
import notesIcon from "../../../../../../../assets/images/icons/edit.svg";
import { useEffect, useState } from "react";

export default function LoadReadingMode(props) {
  const [isReading, setIsReading] = useState(true);
  const [timerValue, setTimerValue] = useState([0, "00:00"]);
  const [timerInterval, setTimerInterval] = useState(null);

  function clearSettins() {
    setTimerValue([0, "00:00"]);
    setTimerInterval(null);
    setIsReading(true);
  }

  const timer = () => {
    setTimerValue((prev) => {
      const newNum = prev[0] + 1;
      return [newNum, timerFormmating(newNum)];
    });
  };

  useEffect(() => {
    if (!props.isDisplayed) return;
    setTimerInterval(setInterval(timer, 1000));
  }, [props.isDisplayed]);

  function toggleReadingStatus(event) {
    if (!event.target.classList[1]) return;
    const targetEvent = event.target.classList[1];

    if (targetEvent === "play") setTimerInterval(setInterval(timer, 1000));
    else clearInterval(timerInterval);

    setIsReading((prev) => !prev);
  }
  const popoutStyle = { left: props.isDisplayed ? "0%" : "100%" };

  function timerFormmating(value) {
    var h = Math.floor(value / 3600);
    var m = Math.floor((value % 3600) / 60);
    var s = Math.floor((value % 3600) % 60);

    return `${h}${m}:${s < 10 ? "0" + s : s}`;
  }

  return (
    <div style={popoutStyle} className="reading_mode_container">
      <div className="content">
        <div className="top">
          <span>Reading mode</span>
          <span
            onClick={() => {
              props.toggleReadingMode();
              clearSettins();
            }}
          >
            Finish
          </span>
        </div>
        <div className="img"></div>

        <span className="timer">{timerValue[1]}</span>

        <div className="options_container">
          <div onClick={toggleReadingStatus} className="option">
            {isReading && (
              <div className="icon">
                <img src={pauseIcon} alt="pause icon" />
                <div className="screen pause"></div>
              </div>
            )}
            {!isReading && (
              <div className="icon">
                <img src={playIcon} alt="play Icon" />
                <div className="screen play"></div>
              </div>
            )}
            <span>{isReading ? "Pause" : "Resume"}</span>
          </div>
          <div className="option">
            <div className="icon">
              <img src={notesIcon} alt="nodes icon" />
            </div>
            <span>Add Note</span>
          </div>
        </div>
      </div>

      {/* make backgroun img the cover image */}
    </div>
  );
}
