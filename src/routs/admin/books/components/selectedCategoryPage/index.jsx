import angleLeft from "../../../../../assets/images/icons/angle-small-left.svg";

export default function LoadSelectedCategoryPage(props) {
  const filterdBooksStyle = {
    left: props.isDisplayed ? "0" : "100%",
    top: window.pageYOffset,
  };
  console.log(window.pageYOffset);
  return (
    <section style={filterdBooksStyle} className="filtered_books_page">
      <div className="top">
        <div onClick={props.togglePopup} className="back_container">
          <div className="icon">
            <img src={angleLeft} alt="angle small left to show back event" />
          </div>
          <span>Bookkeeper</span>
        </div>{" "}
        <span>+</span>
        <span>(-)</span>
      </div>
      <h1>Library</h1>
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
          <span>
            Sort
            <div className="icon"></div>
          </span>
          <div className="options"></div>
        </div>
      </div>
      <div className="books_container">
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
