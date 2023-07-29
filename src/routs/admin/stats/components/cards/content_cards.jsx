export default function StatsContentCards(props) {
  const altTxtColor = {
    color: props.TXT_ICON_color,
  };
  const imgFillStyle = {
    filter: props.filter,
  };
  return (
    <div className="card content_card">
      <div className="icon">
        <img style={imgFillStyle} src={props.icon} alt="icon for card" />
      </div>
      <div className="content_container">
        <span style={altTxtColor}>
          <b>{props.boldTXT}</b> {props.id === 3 && <br />}
          {props.nomralTXT}
        </span>
        {props.id <= 2 && (
          <div>
            <div className="icon"></div>
            <span>{props.bottomTXT}</span>
          </div>
        )}
      </div>
    </div>
  );
}
