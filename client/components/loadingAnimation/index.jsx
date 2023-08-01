import "./index.css";

export default function LoadingAnimation(props) {
  const style = {
    display: props.isDisplayed ? "inline-block" : "none",
  };

  return (
    <div style={style} className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
