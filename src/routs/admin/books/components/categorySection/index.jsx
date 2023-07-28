export default function LoadBooksCategorySection(props) {
  const [filteredProps] = props.isOpen.filter(
    (option) => option.name.toLowerCase() === props.name.toLowerCase()
  );

  const containerStyle = {
    height: filteredProps.isDisplayed
      ? `${
          props.name.toLowerCase() === "collections"
            ? 20 + 56 * props.elements.length + 50
            : 20 + 56 * props.elements.length
        }px`
      : "0px",
    padding: filteredProps.isDisplayed ? "10px 15px" : "0px 15px",
  };
  const iconStyle = {
    transform: filteredProps.isDisplayed ? "rotate(-90deg)" : "rotate(0deg)",
  };
  return (
    <section className={`option_container ${props.name.toLowerCase()}`}>
      <div className="top">
        <span>{props.name}</span>
        <div
          onClick={props.toggleFunction}
          style={iconStyle}
          className={`icon`}
        >
          <img
            className={`${props.name.toLowerCase()}`}
            src={props.icon}
            alt="angle right icon to shop dropdown options"
          />
        </div>
      </div>
      <div
        style={containerStyle}
        className={`catagory_container ${props.name.toLowerCase()}_books_selector`}
      >
        {props.elements}
        {props.name === "Collections" && (
          <div
            onClick={props.popupFunction}
            className="add_new_collection catagory"
          >
            <span>+</span>
            <span>New collection</span>
          </div>
        )}
      </div>
    </section>
  );
}
