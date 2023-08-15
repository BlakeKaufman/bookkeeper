import { useState } from "react";
import "./index.css";

export default function LoadAddCollectionPopup(props) {
  const [collectionInfo, setCollectionInfo] = useState("");

  const popupStyle = {
    opacity: props.isDisplayed ? "1" : "0",
    visibility: props.isDisplayed ? "visible" : "hidden",
  };

  function postTODB() {
    if (!collectionInfo) return;
  }
  return (
    <section style={popupStyle} className="add_collection_popup">
      <div className="form">
        <h1>Add new collection</h1>
        <input
          type="text"
          placeholder="Collection"
          defaultValue={collectionInfo}
          onChange={(event) => setCollectionInfo(event.target.value)}
        />
        <div className="buttons">
          <span onClick={props.toggleFunction}>Cancel</span>
          <span onClick={postTODB}>Add</span>
        </div>
      </div>
    </section>
  );
}
