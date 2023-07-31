import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import crossHairsIcon from "../../../assets/images/icons/location-crosshairs.svg";
import flagIcon from "../../../assets/images/icons/flag.svg";
import LoadBackButton from "../../../components/loginPathBack";

import "./index.css";
import { Link } from "react-router-dom/dist";
import LoginPathContinue from "../../../components/loginPathContinue";

export default function LoadBookGoal() {
  const [bookGoal, setBookGoal] = useState(0);
  const AVGBOOKLENGTH = 200; //pages
  const AVGPAGEREADINGSPEED = 0.75; //mins
  const { logout } = useAuth0();

  function changeBookGoal(event) {
    const changeType = event.target.classList[1];
    if ((bookGoal === 0) & (changeType === "dec")) return;

    setBookGoal((prevGoal) => {
      if (changeType === "dec") return prevGoal - 1;
      else return prevGoal + 1;
    });
  }

  function changeGoalText() {
    const dailyMins = ((AVGBOOKLENGTH * bookGoal) / 365) * AVGPAGEREADINGSPEED;
    const bottomMins = Math.floor(dailyMins);
    const topMins = Math.ceil(dailyMins);

    return [bottomMins, topMins];
  }
  changeGoalText();
  return (
    <div className="book-goal">
      <LoadBackButton
        toggleFunction={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        path={"/"}
      />
      <div className="content">
        <div className="icon">
          <img src={crossHairsIcon} alt="traget icon for book goal" />
        </div>
        <h1>How many books would you like to read this year?</h1>
        <p>
          Set yourself a reading goal and we'll help you achive it. You can
          change this later.
        </p>

        <div className="counter-component">
          <div className="counter">
            <div onClick={changeBookGoal} className="option_box dec">
              -
            </div>
            <span className="num_books">{bookGoal}</span>
            <div onClick={changeBookGoal} className="option_box inc">
              +
            </div>
          </div>
          <div className="reading_time">
            <div className="icon">
              <img src={flagIcon} alt="reading goal icon" />
            </div>
            <p>
              Read{" "}
              <span className="dynamic_range">
                {changeGoalText()[0]}-{changeGoalText()[1]}
              </span>{" "}
              mins daily to reach this goal
            </p>
          </div>
        </div>

        <LoginPathContinue path="/login/reminder" />
      </div>
    </div>
  );
}
