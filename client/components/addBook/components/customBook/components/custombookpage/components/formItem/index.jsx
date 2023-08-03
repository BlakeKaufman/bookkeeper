export default function AddBookFormInformationItem(props) {
  return (
    <div className="detail">
      <span>{props.name}</span>
      <input
        type="text"
        className={`book_detail_input ${props.name.toLowerCase()}`}
        value={`${
          props.formInfo[props.id].value ? props.formInfo[props.id].value : ""
        }`}
        placeholder={props.placeholder}
        onChange={(e) => props.toggleFormInfo(e, props.id + 1)}
      />
    </div>
  );
}
