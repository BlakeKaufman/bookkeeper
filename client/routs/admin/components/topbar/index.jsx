import "./index.css";

export default function AdminTopBar(props) {
  let iconClickEvent;

  if (props.name.toLowerCase() === "bookkeeper") {
    iconClickEvent = (
      <div onClick={props.clickEvent} className="icon">
        <img src={props.icon} alt={`icon for ${props.name} top bar`} />
      </div>
    );
    // } else if (props.name.toLowerCase() === "stats") {
    //   iconClickEvent = (
    //     <div onClick={props.clickEvent} className="icon">
    //       <img src={props.icon} alt={`icon for ${props.name} top bar`} />
    //     </div>
    //   );
  } else if (props.name.toLowerCase() === "wishlist") {
    iconClickEvent = (
      <div
        onClick={() => {
          !props.isInEditMode && props.clickEvent();
        }}
        className="icon"
      >
        <img src={props.icon} alt={`icon for ${props.name} top bar`} />
      </div>
    );
  }
  return (
    <div className="admin_top_Bar">
      <div className="content_container">
        {props.name.toLowerCase() === "bookkeeper" ||
          (props.name.toLowerCase() === "wishlist" && (
            <span onClick={props.editFunction} className="edit_button">
              {props.isInEditMode ? "Save" : " Edit"}
            </span>
          ))}
        <span className="selected_nav">{props.name}</span>
        {iconClickEvent}
      </div>
    </div>
  );
}
