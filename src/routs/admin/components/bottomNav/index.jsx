import "./index.css";
import bookIcon from "../../../../assets/images/icons/books.svg";
import statsIcon from "../../../../assets/images/icons/stats.svg";
import wishListIcon from "../../../../assets/images/icons/list.svg";
export default function LoadBottomNavAdmin() {
  return (
    <div className="nav_bar">
      <ul className="nav_container">
        <li className="nav_item">
          <div className="icon">
            <img src={bookIcon} alt="bookshelf icon for books category" />
          </div>
          <span>Books</span>
          <div className="screen books"></div>
        </li>
        <li className="nav_item">
          <div className="icon">
            <img src={wishListIcon} alt="wishlist icon for wishlist category" />
          </div>
          <span>WishList</span>
          <div className="screen cards"></div>
        </li>
        <li className="nav_item">
          <div className="icon">
            <img src={statsIcon} alt="stats icon for stats category" />
          </div>
          <span>Stats</span>
          <div className="screen stats"></div>
        </li>
      </ul>
    </div>
  );
}
