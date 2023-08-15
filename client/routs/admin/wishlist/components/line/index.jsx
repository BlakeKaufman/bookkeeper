export default function NoteBookLine(props) {
  return (
    <div className="line">
      <div className="sidebar">
        <div className="dot"></div>
      </div>

      <div className="text_line">
        <span>{props.book}</span>
        {props.isRemovable && (
          <div className="removeSelector">
            {props.removingBooks[Number(props.posInArr)].isSelected && (
              <div className="activeRemove"></div>
            )}
          </div>
        )}
      </div>
      <div
        onClick={(e) => {
          props.isRemovable && props.removingBookFunction(e);
        }}
        className={`screen ${props.posInArr}`}
      ></div>
    </div>
  );
}
