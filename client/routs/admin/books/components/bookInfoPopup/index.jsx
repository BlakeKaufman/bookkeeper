import { useEffect, useState } from "react";
import arrowLeft from "../../../../../assets/images/icons/angle-small-left.svg";
import playButtonIcon from "../../../../../assets/images/icons/play.svg";
import bookIcon from "../../../../../assets/images/icons/book.svg";

export default function LoadBookInfoPopup(props) {
  const [bookInformation, setBookInformation] = useState({});
  console.log(props);

  const bookInfoStyle = {
    left: props.isDisplayed ? "0" : "100%",
  };

  useEffect(() => {
    if (!props.book_id) return;
    const [selectedBook] = props.books.filter(
      (book) => book._id === props.book_id
    );

    setBookInformation(selectedBook);
  }, [props.book_id]);

  if (!bookInformation.book) return;

  console.log(bookInformation);
  return (
    <section style={bookInfoStyle} className="book_info_popup">
      <div className="topbar">
        <div className="top">
          <div onClick={props.togglePopup} className="back_button">
            <div className="icon">
              <img src={arrowLeft} alt="angle right for back button" />
            </div>
            <span>Back</span>
          </div>
          <span className="book_tittle">
            <span>{bookInformation.book[2].value}</span>
          </span>
          <span>+</span>
          <div className="icon"></div>
        </div>
        <ul className="nav_container">
          <li className="nav_item active_item">book</li>
          <li className="nav_item">Cards</li>
          <li className="nav_item">Trends</li>
          <li className="nav_item">Sessions</li>
          <li className="nav_item">About</li>
          <div className="underline"></div>
        </ul>
      </div>
      <section className="selected_book">
        <div className="img">
          <img src={bookInformation?.book[0].value} alt="book cover" />
        </div>
        <h2>{bookInformation?.book[2].value}</h2>
        <span className="author_name">{bookInformation?.book[3].value}</span>
        <div className="book_options">
          <div className="option">
            <div className="icon">
              <img src={playButtonIcon} alt="play button for reading mode" />
            </div>
            <span>Reading Mode</span>
          </div>
          <div className="option">
            <div className="icon">
              <img src={bookIcon} alt="books icon for category selector" />
            </div>
            <span>Reading</span>
          </div>
          {/* <div className="option">
            <div className="icon"></div>
            <span>Book Chat</span>
          </div> */}
        </div>
      </section>
      <section className="book_facts">
        <div className="slice"></div>
        <div className="basic_infos">
          <div className="info">
            <span>Started</span>
            <span>Add Date</span>
          </div>
          <div className="info">
            <span>Finished</span>
            <span>Add Date</span>
          </div>
          <div className="info">
            <span>Rating</span>
            <span>Add Rating</span>
          </div>
        </div>
        <div className="cards facts_container">
          <div className="top">
            <h1>Cards</h1>
            <span className="num_cards">0</span>
            <span>Edit</span>
          </div>
          <div className="scroll_container">
            <ul className="nav_container">
              <li className="nav_item active_nav">Sort</li>
              <li className="nav_item active_nav">All Cards</li>
              <li className="nav_item">Starred</li>
              <li className="nav_item">Notes</li>
              <li className="nav_item">Clash Cards</li>
              <li className="nav_item">Quotes</li>
              <li className="nav_item">Definishions</li>
            </ul>
          </div>
          <div className="cards_container">
            <div className="no_cards">
              <div className="icon"></div>
              <span>No Cards</span>
              <span>
                Add cards using the + button and they will appear here.
              </span>
            </div>
          </div>
        </div>
        <div className="stats_trends facts_container">
          <div className="top">
            <h1>Stats & Trends</h1>
          </div>
          <div className="stats_container">
            <div className="nav">
              <span>Pages Read</span>
              <span>Reading Time</span>
              <div className="background"></div>
            </div>
            <div className="graph">GRAPH</div>
            <div className="stats">
              <div>
                <span>Reading Time</span>
                <span>30m</span>
              </div>
              <div>
                <span>Est. time left</span>
                <span>60m</span>
              </div>
              <div>
                <span>Pages read</span>
                <span>150</span>
              </div>
              <div>
                <span>Longest streak</span>
                <span>1 day</span>
              </div>
              <div>
                <span>Pages/hour</span>
                <span>298.0</span>
              </div>
              <div>
                <span>Pages/min</span>
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="reading_sessions facts_container">
          <div className="top">
            <h1>Reading Sessions</h1>
            <span className="num_sessions">1</span>
          </div>
          <div className="sessions_container">
            <div className="session">
              <div className="icon"></div>
              <span>July 24, 2023</span>
              <span>30m</span>
              <span>++</span>
            </div>
          </div>
        </div>
        <div className="about facts_container">
          <div className="top">
            <h1>About</h1>
          </div>
          <div className="about_container">
            <span className="description">{bookInformation.book[8].value}</span>
            <div className="grid_information">
              <span>Publisher</span>
              <span>{bookInformation.book[4].value}</span>

              <span>Published</span>
              <span>{bookInformation.book[5].value}</span>

              <span>ISBN</span>
              <span>{bookInformation.book[7].value}</span>

              <span>Pages</span>
              <span>{bookInformation.book[1].value}</span>

              <span>Category</span>
              <span>{bookInformation.book[6].value}</span>
            </div>
          </div>
        </div>

        <a className="buy_CTA">Buy on Amazon</a>
      </section>
    </section>
  );
}
