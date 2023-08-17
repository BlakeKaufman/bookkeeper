import { useState } from "react";
import "./index.css";

export default function LoadWishlistBookInput(props) {
  const [formValue, setFormValue] = useState("");
  function submit() {
    const localHostURl =
      "http://localhost:8888/.netlify/functions/wishlist_update";
    const productionURL =
      "https://bookkeeperwebsite.netlify.app/.netlify/functions/wishlist_update";

    const newList = props.bookList;
    newList.push(formValue);

    const requestBody = {
      user: props.user.sub,
      wishlist: newList,
    };
    const options = {
      method: "POST", // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON since we're sending JSON data
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON string
    };

    fetch(productionURL, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setReloadPage((prev) => (prev += 1));
        props.togglePopup();
        setFormValue("");
      });
  }

  function cancel() {
    props.togglePopup();
  }
  const popupStyling = {
    zIndex: props.isDisplayed ? "99" : "-1",
    opacity: props.isDisplayed ? "1" : "0",
  };

  return (
    <div style={popupStyling} id="wishlistBookInput">
      <div className="content">
        <h1>Enter Book</h1>
        <span className="subTitle">
          Once you add a book, you can always delete it later.
        </span>
        <input
          type="text"
          value={formValue}
          placeholder="Book name here"
          name="wishlistBook"
          onChange={(event) => setFormValue(event.target.value)}
        />
        <div className="options">
          <span onClick={submit} className="submitBTN BTN">
            Submit
          </span>
          <span onClick={cancel} className="cancelBTN BTN">
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
}
