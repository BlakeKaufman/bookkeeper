import { Link } from "react-router-dom/dist";

export default function LoginPathContinue(props) {
  return (
    <Link className="continue_BTN" to={props.path}>
      Continue
    </Link>
  );
}
