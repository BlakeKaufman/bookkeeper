import LoadBottomNavAdmin from "../components/bottomNav";
import AdminTopBar from "../components/topbar";
import StatsContentCards from "./components/cards/content_cards";
import StatsCards from "./components/cards";
import "./index.css";

import settingsIcon from "../../../assets/images/icons/settings.svg";
import bookIcon from "../../../assets/images/icons/book.svg";
import targetIcon from "../../../assets/images/icons/location-crosshairs.svg";
import starIcon from "../../../assets/images/icons/stars.svg";

import checkIcon from "../../../assets/images/icons/check.svg";
import clockIcon from "../../../assets/images/icons/clock.svg";
import star from "../../../assets/images/icons/circle-star.svg";
import { useState } from "react";
import LoadSettingsPopup from "./components/settings";

const goalCards = [
  {
    cardName: "daily_reading_goal",
    icon: bookIcon,
    title: "Daily reading goal",
  },
  {
    cardName: "yearly_reading_goal",
    icon: targetIcon,
    title: "2023 reading goal",
    altIcon: starIcon,
  },
];
const contentCards = [
  {
    boldTXT: "You finished",
    nomralTXT: "0 books.",
    icon: checkIcon,
    TXT_ICON_color: "green",
    bottomTXT: "0 books",
    id: 1,
    filter:
      "invert(22%) sepia(83%) saturate(4124%) hue-rotate(100deg) brightness(96%) contrast(105%)",
  },
  {
    boldTXT: "Your average reading speed was",
    nomralTXT: "298 pages per hour.",
    icon: clockIcon,
    TXT_ICON_color: "blue",
    bottomTXT: "298 pages per hour",
    id: 2,
    filter:
      "invert(12%) sepia(100%) saturate(4486%) hue-rotate(243deg) brightness(96%) contrast(154%)",
  },
  {
    boldTXT: "Your top categories were",
    nomralTXT: "Clasified (0)",
    icon: star,
    TXT_ICON_color: "orange",
    id: 3,
    filter:
      "invert(79%) sepia(66%) saturate(5004%) hue-rotate(3deg) brightness(109%) contrast(101%)",
  },
];

export default function LoadStatsAdmin() {
  const [settingsDisplayed, setSettingsDisplayed] = useState(false);
  function toggleSettings() {
    console.log("test");

    setSettingsDisplayed((prev) => !prev);
  }
  const goalElements = goalCards.map((card) => {
    return <StatsCards key={card.cardName} {...card} />;
  });
  const contentCardElements = contentCards.map((card) => {
    return <StatsContentCards key={card.id} {...card} />;
  });
  return (
    <div className="stats_admin">
      <AdminTopBar
        clickEvent={toggleSettings}
        name="Stats"
        icon={settingsIcon}
      />
      <section className="stats_content">
        <div className="stats_container goal_container">
          <h1>Stats</h1>
          <div className="top">
            <h2>Goals</h2>
            <span>Edit</span>
          </div>
          <div className="stats_cards goal_cards">{goalElements}</div>
        </div>
        <div className="stats_container trends_container">
          <div className="top">
            <h2>Trends</h2>
            {/* <!-- <span>Last 7 days</span> --> */}
          </div>
          <div className="stats_cards trends_cards">
            <div className="card">
              <div className="top">
                <span>Mins</span>
              </div>
              <div className="graph"></div>
            </div>
            <div className="card">
              <div className="top">
                <span>Pages</span>
              </div>
              <div className="graph"></div>
            </div>
            {contentCardElements}
          </div>
        </div>
      </section>
      <LoadBottomNavAdmin activeNav="stats" />

      <LoadSettingsPopup
        isDisplayed={settingsDisplayed}
        toggleSettings={toggleSettings}
      />
    </div>
  );
}
