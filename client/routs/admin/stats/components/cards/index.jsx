export default function StatsCards(props) {
  let content;
  const year = new Date().getFullYear();
  const books = props.allInformation[0];
  const profile = props.allInformation[1];
  const finsihedBooks = books.content.filter((book) => {
    if (book.book[9].value.toLowerCase() === "finished") {
      if (year === book.finishedDate) {
        return true;
      }
    } else false;
  });

  function numBooksLeftInGoal() {
    return Number(profile.content.book_goal) - Number(finsihedBooks.length);
  }

  console.log(finsihedBooks);

  const barStyling = {
    width: `${(finsihedBooks.length / profile.content.book_goal) * 100}%`,
  };

  let finishedBookElements = [];

  for (let i = 1; i <= profile.content.book_goal; i++) {
    if (finsihedBooks[i - 1]) {
      finishedBookElements.push(
        <div key={i} className="book">
          <img src={finsihedBooks[i - 1].book[0].value} alt="book cover" />
        </div>
      );
    } else {
      finishedBookElements.push(
        <div key={i} className="book">
          <span>{i}</span>
        </div>
      );
    }
  }

  if (props.cardName === "yearly_reading_goal") {
    content = (
      <>
        <span className="goal">
          {finsihedBooks.length} of {profile.content.book_goal} books
        </span>
        <div className="bar">
          <div style={barStyling} className="fill"></div>
        </div>

        <div className="finishedBooksContainer">
          <div className="content">{finishedBookElements}</div>
        </div>

        <div className="message">
          <div className="icon">
            <img src={props.altIcon} alt="icon to make you see the message" />
          </div>
          {finsihedBooks.length === 0 && (
            <span>
              You've got this! Finish a book to make progress tword your goal.
            </span>
          )}
          {finsihedBooks.length != 0 && (
            <span>
              You've got this! Finish {numBooksLeftInGoal()} more book
              {numBooksLeftInGoal() === 1 ? "" : "s"} to meat your goal!
            </span>
          )}
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
