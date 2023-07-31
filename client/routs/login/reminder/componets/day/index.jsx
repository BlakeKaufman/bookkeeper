export default function LoadDayReminder(props) {
  return (
    <div
      onClick={props.toggleFunction}
      className={`day ${props.day} ${props.isSelected && "active-day"} `}
    >
      {props.day[0]}
    </div>
  );
}
