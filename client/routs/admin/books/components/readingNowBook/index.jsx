export default function ReadingNowBooks(props) {
  console.log(props, ")))))");
  function dynamicPagesContent() {
    const bookLength = props.book[1].value;
    const pagesRead =
      props.readingSessions &&
      props.readingSessions[props.readingSessions.length - 1].finish;

    let pagesLeft = 0;
    let fillWidth = 0;

    if (!pagesRead) {
      pagesLeft = bookLength;
      fillWidth = 0;
    } else {
      pagesLeft = bookLength - pagesRead;
      fillWidth = 110 * (pagesRead / bookLength);
    }

    return [pagesLeft, fillWidth];
  }

  const barFillStyle = { width: `${dynamicPagesContent()[1]}px` };
  return (
    <div className={`book`}>
      {/* the 1 is the book id */}
      <div className="img">
        <img src={props.book[0].value} alt="book cover" />
      </div>
      <span className="pages_left">{`${dynamicPagesContent()[0]}pg left`}</span>
      <div className="bar">
        <div style={barFillStyle} className="fill"></div>
      </div>
      <div
        onClick={props.toggleBookInfo}
        className={`screen ${props._id}`}
      ></div>
    </div>
  );
}
