import "./index.css";
import bookIcon from "../../../../assets/images/icons/books.svg";
import statsIcon from "../../../../assets/images/icons/stats.svg";
import wishListIcon from "../../../../assets/images/icons/list.svg";
import { NavLink } from "react-router-dom";

export default function LoadBottomNavAdmin(props) {
  return (
    <div className="nav_bar">
      <ul className="nav_container">
        <NavLink
          className={`nav_item ${props.activeNav === "books" && "active"}`}
          to="/admin/books"
        >
          <div className="icon">
            <img src={bookIcon} alt="bookshelf icon for books category" />
          </div>
          <span>Books</span>
          <div className="screen books"></div>
        </NavLink>
        <NavLink
          className={`nav_item ${props.activeNav === "wishlist" && "active"}`}
          to="/admin/wishlist"
        >
          <div className="icon">
            <img src={wishListIcon} alt="wishlist icon for wishlist category" />
          </div>
          <span>WishList</span>
          <div className="screen cards"></div>
        </NavLink>
        <NavLink
          className={`nav_item ${props.activeNav === "stats" && "active"}`}
          to="/admin/stats"
        >
          <div className="icon">
            <img src={statsIcon} alt="stats icon for stats category" />
          </div>
          <span>Stats</span>
          <div className="screen stats"></div>
        </NavLink>
      </ul>
    </div>
  );
}
