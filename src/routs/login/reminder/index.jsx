import "./index.css";

import LoadBackButton from "../../../components/loginPathBack";
import calendarIcon from "../../../assets/images/icons/calendar.svg";
import notificationIcon from "../../../assets/images/icons/notification.svg";

export default function LoadReminder() {
  function addActiveDay(event) {
    const targetEvent = event.target;

    if (targetEvent.classList.contains("active-day"))
      targetEvent.classList.remove("active-day");
    else targetEvent.classList.add("active-day");
  }
  return (
    <div className="reminder">
      <LoadBackButton path={"/login/bookGoal"} />
      <div className="content">
        <div className="icon">
          <img src={calendarIcon} alt="calendar icon for reminder" />
        </div>
        <h1>On what days would you like to read?</h1>
        <p>
          We'll send you reading reminders to help you stick to your schedule.
        </p>

        <div className="days-component">
          <div className="days-selector">
            <div onClick={addActiveDay} className="day">
              S
            </div>
            <div onClick={addActiveDay} className="day">
              M
            </div>
            <div onClick={addActiveDay} className="day">
              T
            </div>
            <div onClick={addActiveDay} className="day">
              W
            </div>
            <div onClick={addActiveDay} className="day">
              T
            </div>
            <div onClick={addActiveDay} className="day">
              F
            </div>
            <div onClick={addActiveDay} className="day">
              S
            </div>
          </div>
          <div className="notification">
            <div className="icon">
              <img src={notificationIcon} alt="notification icon" />
            </div>
            <span>Remind me at</span>
            <div className="time_selector">
              <span className="selected_time">9:00 AM</span>
              <div className="time"></div>
            </div>
          </div>
        </div>
        <a href="startLibrary" className="continue_BTN">
          Continue
        </a>
      </div>
    </div>
  );
}
