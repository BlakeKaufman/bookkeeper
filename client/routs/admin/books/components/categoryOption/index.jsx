import arrowRightIcon from "../../../../../assets/images/icons/angle-right.svg";

export default function CategoryOption(props) {
  let bookNum = 0;
  if (props.name.toLowerCase() === "library") {
    bookNum = props.userBooks.length;
  } else if (props.name.toLowerCase() === "to read") {
    bookNum = props.userBooks.filter(
      (book) => book.book[9].value === "To Read"
    ).length;
  } else if (props.name.toLowerCase() === "reading now") {
    bookNum = props.userBooks.filter(
      (book) => book.book[9].value === "Reading"
    ).length;
  } else if (props.name.toLowerCase() === "finished") {
    bookNum = props.userBooks.filter(
      (book) => book.book[9].value === "finished"
    ).length;
  } else if (props.name.toLowerCase() === "abandoned") {
    bookNum = props.userBooks.filter(
      (book) => book.book[9].value === "abandoned"
    ).length;
  }
  return (
    <div className="catagory">
      <div className="icon">
        {props.icon && (
          <img src={props.icon} alt={`Icon for ${props.name} selector`} />
        )}
        {/* <img src={props.icon} alt={`Icon for ${props.name} selector`} /> */}
      </div>
      <span>{props.name}</span>
      <span className="num_books">{bookNum}</span>
      <div className="arrow_icon icon">
        <img src={arrowRightIcon} alt="arrow right icon to show click event" />
      </div>
      <div
        onClick={props.togglePopup}
        className={`screen ${
          props.name.includes(" ") ? props.name.replace(" ", "_") : props.name
        }`}
      ></div>
    </div>
  );
}
