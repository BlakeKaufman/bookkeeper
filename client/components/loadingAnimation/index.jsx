import "./index.css";

export default function LoadingAnimation(props) {
  const style = {
    display: props.isDisplayed.length === 0 ? "inline-block" : "none",
  };

  console.log(props.isDisplayed.length);
  return (
    <div style={style} className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
