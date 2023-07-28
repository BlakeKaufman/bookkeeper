export default function LoadBooksCategorySection(props) {
  return (
    <section className={`option_container ${props.name.toLowerCase()}`}>
      <div className="top">
        <span>{props.name}</span>
        <div className="icon"></div>
      </div>
      <div className="catagory_container">
        {props.elements}
        {props.name === "Collections" && (
          <div className="add_new_collection catagory">
            <span>+</span>
            <span>New collection</span>
          </div>
        )}
      </div>
    </section>
  );
}
