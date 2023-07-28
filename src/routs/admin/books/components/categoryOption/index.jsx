import arrowRightIcon from "../../../../../assets/images/icons/angle-right.svg";

export default function CategoryOption(props) {
  return (
    <div onClick={props.togglePopup} className="catagory">
      <div className="icon">
        {props.icon && (
          <img src={props.icon} alt={`Icon for ${props.name} selector`} />
        )}
        {/* <img src={props.icon} alt={`Icon for ${props.name} selector`} /> */}
      </div>
      <span>{props.name}</span>
      <span className="num_books">2</span>
      <div className="arrow_icon icon">
        <img src={arrowRightIcon} alt="arrow right icon to show click event" />
      </div>
    </div>
  );
}
