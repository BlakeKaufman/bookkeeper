import checkIcon from "../../../../assets/images/icons/check.svg";

export default function LoadReadingStatusOptions(props) {
  const isSelectedStyle = {
    display: props.isSelected ? "block" : "none",
  };
  return (
    <div className="detail">
      <span>
        <div className="icon">
          <img src={props.iconImg} alt={`Icon image for ${props.name}`} />
        </div>
        {props.name}
      </span>
      <div className="checkIcon icon">
        <img
          style={isSelectedStyle}
          src={checkIcon}
          alt="check icon to signify selected reading status"
        />
      </div>
      <div onClick={props.onClick} className="screen to_read"></div>
    </div>
  );
}
