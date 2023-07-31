import "./index.css";

import backIcon from "../../assets/images/icons/angle-small-left.svg";
import { Link } from "react-router-dom/dist";

export default function LoadBackButton(props) {
  return (
    <div
      onClick={!!props.toggleFunction ? props.toggleFunction : () => null}
      id="back_Container"
    >
      <div className="icon">
        <img src={backIcon} alt="backarrow for back button" />
      </div>

      <Link className="back_BTN" to={props.path}>
        Back
      </Link>
    </div>
  );
}
