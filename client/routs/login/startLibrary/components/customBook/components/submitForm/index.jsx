import LoadingAnimation from "../../../../../../../components/loadingAnimation";

export default function AddBookSubmitForm(props) {
  function goBack() {
    props.toggleFunction([false, false]);
    props.setSubmitingPopup(false);
  }
  return (
    <div
      style={{ display: props.isShown[0] ? "flex" : "none" }}
      className="validationContainer"
    >
      <LoadingAnimation isDisplayed={!props.isShown[1]} />

      {props.isShown[1] && <div className="contentContainer">Submited!</div>}
      <span onClick={goBack}>Return</span>
    </div>
  );
}
