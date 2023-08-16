import "./index.css";
import flagIcon from "../../assets/images/icons/flag.svg";
import StarIcon from "../../assets/images/icons/stars.svg";

export default function BookCounterComponent(props) {
  const AVGBOOKLENGTH = 200; //pages
  const AVGPAGEREADINGSPEED = 0.75; //mins

  function changeGoalText() {
    const dailyMins =
      ((AVGBOOKLENGTH * props.bookGoal) / 365) * AVGPAGEREADINGSPEED;
    const bottomMins = Math.floor(dailyMins);
    const topMins = Math.ceil(dailyMins);

    return [bottomMins, topMins];
  }

  function changeBookGoal(event) {
    const changeType = event.target.classList[1];
    if ((props.bookGoal === 0) & (changeType === "dec")) return;

    props.setBookGoal((prevGoal) => {
      if (changeType === "dec") return prevGoal - 1;
      else return prevGoal + 1;
    });
  }

  const couterStyle = {
    maxWidth: props.from === "stats_admin" ? "250px" : "200px",
  };
  changeGoalText();
  return (
    <div id="counter-component">
      <div style={couterStyle} className="counter">
        <div onClick={changeBookGoal} className="option_box dec">
          -
        </div>
        <span className="num_books">
          {props.bookGoal} {props.from === "stats_admin" && "Books"}
        </span>
        <div onClick={changeBookGoal} className="option_box inc">
          +
        </div>
      </div>
      {props.from === "login_bookGoal" && (
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
      )}
      {props.from === "stats_admin" && (
        <div style={{ marginTop: "0" }} className="message">
          <div className="icon">
            <img src={StarIcon} alt="star Icon" />
          </div>
          <span>
            Read{" "}
            <span className="dynamic_range">
              {changeGoalText()[0]}-{changeGoalText()[1]}{" "}
            </span>{" "}
            mins daily to reach this goal
          </span>
        </div>
        //   <p>
        //     Read{" "}
        //     <span className="dynamic_range">
        //       {changeGoalText()[0]}-{changeGoalText()[1]}
        //     </span>{" "}
        //     mins daily to reach this goal
        //   </p>
      )}
    </div>
  );
}
