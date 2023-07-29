import backgroundImage from "../../../assets/bookshelf_background.webp";

import "./index.css";

export default function LoadLandingPage() {
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
        <a href="/login/bookGoal" className="CTAButton">
          Get Started
        </a>
        <a href={"./pages/bookgoal/index.html"} className="CTAButton">
          Login
        </a>

        <p>Privacy-first. No signup required</p>
      </div>
    </div>
  );
}
