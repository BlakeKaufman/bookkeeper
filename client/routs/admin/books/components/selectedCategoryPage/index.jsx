import angleLeft from "../../../../../assets/images/icons/angle-small-left.svg";

import sortIcon from "../../../../../assets/images/icons/sort-alt.svg";
import booksIcon from "../../../../../assets/images/icons/books.svg";

export default function LoadSelectedCategoryPage(props) {
  console.log(props);
  const filterdBooksStyle = {
    left: props.isDisplayed ? "0" : "100%",
  };

  return (
    <section style={filterdBooksStyle} className="filtered_books_page">
      <div className="top">
        <div onClick={props.togglePopup} className="back_container">
          <div className="icon">
            <img src={angleLeft} alt="angle small left to show back event" />
          </div>
          <span>Bookkeeper</span>
        </div>
        {/* <span>+</span>
        <span>(-)</span> */}
      </div>
      <h1>
        {props.header.includes("_")
          ? props.header.split("_").join(" ").charAt(0).toUpperCase() +
            props.header.split("_").join(" ").slice(1)
          : props.header.charAt(0).toUpperCase() + props.header.slice(1)}
      </h1>
      {/* <!-- title of box clicked --> */}
      <input
        type="text"
        name="#"
        id="#"
        placeholder="Search by title or author"
      />
      <div className="filter_container">
        <span>1 Book</span>
        <div className="sort">
          <div className="text_container">
            <span>Sort</span>
            <div className="icon">
              <img src={sortIcon} alt="sort icon for book sorting" />
            </div>
          </div>
          <div className="options"></div>
        </div>
      </div>
      <div className="books_container">
        <div className="is_empty_container">
          <div className="icon">
            <img
              src={booksIcon}
              alt="book icon to show there are no books in this collection"
            />
          </div>
          <span>This collection is empty</span>
          <span>Add books by searching, scanning, or creating your own.</span>
          <span>Add a new book</span>
        </div>

        <div className="book">
          <div className="cover_img"></div>
          <div>
            <span>The Fifth Miracle</span>
            <span>Author</span>
          </div>
          <div className="icon"></div>
        </div>
      </div>
    </section>
  );
}
