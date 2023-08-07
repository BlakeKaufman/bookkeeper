import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

import LoadBackButton from "../../../components/loginPathBack";
import calendarIcon from "../../../assets/images/icons/calendar.svg";
import notificationIcon from "../../../assets/images/icons/notification.svg";
import LoginPathContinue from "../../../components/loginPathContinue";
import LoadDayReminder from "./componets/day";
import testUserIsLoggedIn from "../../../../auth0/testUserLogin";

const dayObject = [
  { day: "Sunday", isSelected: false },
  { day: "Monday", isSelected: false },
  { day: "Tuseday", isSelected: false },
  { day: "Wednesday", isSelected: false },
  { day: "Thursday", isSelected: false },
  { day: "Friday", isSelected: false },
  { day: "Saturday", isSelected: false },
];

export default function LoadReminder() {
  testUserIsLoggedIn();
  const [activeDay, setActiveDay] = useState(dayObject);
  const navigate = useNavigate();

  function addActiveDay(event) {
    const targetEvent = event.target;
    console.log(targetEvent);

    setActiveDay((prevArr) => {
      return prevArr.map((day) => {
        if (day.day === targetEvent.classList[1])
          return { ...day, isSelected: !day.isSelected };
        else return day;
      });
    });

    // if (targetEvent.classList.contains("active-day"))
    //   targetEvent.classList.remove("active-day");
    // else targetEvent.classList.add("active-day");
  }

  function updateUserProfile() {
    let userProfile = JSON.parse(localStorage.getItem("userProfile"));

    const notificationDays = activeDay
      .map((day) => {
        if (day.isSelected) return day.day;
      })
      .filter((day) => day);

    userProfile["notification_choice"] = notificationDays;

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    navigate("/login/startLibrary");
  }

  const dayElements = activeDay.map((day) => {
    return (
      <LoadDayReminder
        key={day.day}
        day={day.day}
        isSelected={day.isSelected}
        toggleFunction={addActiveDay}
      />
    );
  });
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
          <div className="days-selector">{dayElements}</div>
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

        <LoginPathContinue onClick={updateUserProfile} />
      </div>
    </div>
  );
}
