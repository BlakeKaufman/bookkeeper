import arrowLeft from "../../../../../assets/images/icons/angle-small-left.svg";

export default function LoadBookInfoPopup(props) {
  const bookInfoStyle = {
    left: props.isDisplayed ? "0" : "100%",
  };
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
            <span>The fifth miracle</span>
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
        <div className="img"></div>
        <h2>The fifth miracle</h2>
        <span className="author_name">Author</span>
        <div className="book_options">
          <div className="option">
            <div className="icon"></div>
            <span>Reading Mode</span>
          </div>
          <div className="option">
            <div className="icon"></div>
            <span>Reading</span>
          </div>
          <div className="option">
            <div className="icon"></div>
            <span>Book Chat</span>
          </div>
        </div>
      </section>
      <section className="book_facts">
        <div className="slice"></div>
        <div className="basic_infos">
          <div className="info">
            <span>Started</span>
            <span>Jul 24, 23</span>
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
            <span className="description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              optio ex fugit debitis, laudantium voluptate sunt totam,
              voluptatem ullam mollitia itaque voluptatum, nemo ad. Velit
              quaerat recusandae atque beatae. Modi?
            </span>
            <div className="grid_information">
              <span>Publisher</span>
              <span>Penguin Publishing Group</span>

              <span>Published</span>
              <span>2015</span>

              <span>ISBN</span>
              <span>9872979712937234</span>

              <span>Pages</span>
              <span>445</span>

              <span>Category</span>
              <span>Medical, PHYCHOLOGY, Psychology</span>
            </div>
          </div>
        </div>

        <a className="buy_CTA">Buy on Amazon</a>
      </section>
    </section>
  );
}
