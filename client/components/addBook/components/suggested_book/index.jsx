import { useEffect, useState } from "react";
import LoadingAnimation from "../../../loadingAnimation";

export default function LoadSuggestedBook(props) {
  const [cover, setCover] = useState("");

  useEffect(() => {
    fetch(`https://covers.openlibrary.org/b/isbn/${props.id}-M.jpg`).then(
      (response) => setCover(response.url)
    );
  }, []);

  const imgStyle = {
    display: !cover ? "none" : "block",
  };

  return (
    <div onClick={props.onClick} className="book">
      <LoadingAnimation isDisplayed={!cover} />
      <img
        style={imgStyle}
        src={cover}
        alt={`book cover img for ${props.title} book`}
        className={props.id}
      />
    </div>
  );
}
