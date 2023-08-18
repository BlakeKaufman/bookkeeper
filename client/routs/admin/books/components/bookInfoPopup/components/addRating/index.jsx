import "./index.css";

export default function AddRatingPopup(props) {
  function toggleRating(event) {
    const clickType = event.target.classList[1];

    if (clickType === "dec" && props.rating > 0)
      props.setRating((prev) => (prev -= 0.5));
    else if (clickType === "inc" && props.rating < 5)
      props.setRating((prev) => (prev += 0.5));
  }

  function cancel() {
    props.toggleAddRating();
  }

  function clearRating() {
    props.setRating(0);
  }

  function submitRating() {
    const id = props.bookInformation._id;
    const localHostURl = "http://localhost:8888/.netlify/functions/add_rating";
    const productionHostURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/add_rating";

    const requestBody = {
      _id: id,
      bookRating: props.rating,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    fetch(productionHostURL, options)
      .then((response) => response.json())
      .then((data) => {
        props.realoadPage((prev) => (prev += 1));
        props.toggleAddRating();
        props.setReloadPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const popupStyle = {
    opacity: props.isDisplayed ? "1" : "0",
    zIndex: props.isDisplayed ? "99" : "-1",
    position: props.isDisplayed ? "fixed" : "absolute",
  };
  const contentSytle = {
    bottom: props.isDisplayed ? "50%" : "-100%",
    transform: props.isDisplayed
      ? "transform: translate(-50%,50%)"
      : "transform: unset",
  };

  return (
    <div style={popupStyle} id="addRatingPopup">
      <div style={contentSytle} className="content">
        <div className="top">
          <h1>Rating</h1>
          <h2 onClick={clearRating}>Clear</h2>
        </div>
        <div className="ratingContainer">
          <span onClick={toggleRating} className="option dec">
            -
          </span>
          <span className="rating">{props.rating.toFixed(1)}/5.0</span>
          <span onClick={toggleRating} className="option inc">
            +
          </span>
        </div>
        <div className="CTA_BTNS">
          <span onClick={cancel}>Cancel</span>
          <span onClick={submitRating}>Save</span>
        </div>
      </div>
    </div>
  );
}
