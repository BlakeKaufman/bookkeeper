import "./index.css";

import backIcon from "../../assets/images/icons/angle-small-left.svg";

export default function LoadBackButton(props) {
  return (
    <div
      onClick={!!props.toggleFunction ? props.toggleFunction : () => null}
      id="back_Container"
    >
      <div className="icon">
        <img src={backIcon} alt="backarrow for back button" />
      </div>
      <a href={props.path} className="back_BTN">
        Back
      </a>
    </div>
  );
}
