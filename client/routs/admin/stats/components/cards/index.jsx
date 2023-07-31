export default function StatsCards(props) {
  let content;

  if (props.cardName === "daily_reading_goal") {
    content = (
      <>
        <div className="flex_between">
          <span className="goal">0 or 0 mins</span>
          <div className="icon"></div>
        </div>
        <div className="bar">
          <div className="fill"></div>
        </div>
      </>
    );
  } else if (props.cardName === "yearly_reading_goal") {
    content = (
      <>
        <span className="goal">0 or 0 books</span>
        <div className="bar">
          <div className="fill"></div>
        </div>

        <div className="message">
          <div className="icon">
            <img src={props.altIcon} alt="icon to make you see the message" />
          </div>
          <span>
            You've got this! Finish a book to make progress tword your goal.
          </span>
        </div>
      </>
    );
  }
  return (
    <div className="card">
      <div className="top">
        <div className="icon">
          <img src={props.icon} alt={`icon for ${props.title} card`} />
        </div>
        <span>{props.title}</span>
      </div>
      {content}
    </div>
  );
}
