export default function ReadingNowBooks(props) {
  return (
    <div className={`book`}>
      {/* the 1 is the book id */}
      <div className="img">
        <img src={props.book[0].value} alt="book cover" />
      </div>
      <span className="pages_left">100pg left</span>
      <div className="bar">
        <div className="fill"></div>
      </div>
      <div
        onClick={props.toggleBookInfo}
        className={`screen ${props._id}`}
      ></div>
    </div>
  );
}
