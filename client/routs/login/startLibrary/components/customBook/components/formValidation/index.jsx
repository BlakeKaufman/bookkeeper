export default function AddBookFormValidation(props) {
  function goBack() {
    props.toggleFunction(false);
    props.setSubmitingPopup(false);
  }
  return (
    <div
      style={{ display: props.isShown ? "flex" : "none" }}
      className="validationContainer"
    >
      <div className="contentContainer">{props.content}</div>
      <span onClick={goBack}>Return</span>
    </div>
  );
}
