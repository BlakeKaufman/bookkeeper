import { Link } from "react-router-dom/dist";
import LoginButton from "../../../../auth0/login";
import backgroundImage from "../../../assets/bookshelf_background.webp";

import "./index.css";
import SignUp from "../../../../auth0/signup";
import RedirectPage from "../../../../auth0/loginSignupRedirect";

export default function LoadLandingPage() {
  RedirectPage();
  return (
    <div className="landing-page">
      <img
        className="backgroundImage"
        src={backgroundImage}
        alt="Bookshelf background for landing page"
      />
      <div className="CTA_BOX">
        <div className="logo">
          <img className="containedImage" src="" alt="logo" />
        </div>
        <h1>Read, track, and actually remember.</h1>
        <p>Join 1 Bookkeeper user who have made a reading habit that sticks.</p>

        <SignUp />

        <LoginButton />

        <p>Privacy-first. No signup required</p>
      </div>
    </div>
  );
}