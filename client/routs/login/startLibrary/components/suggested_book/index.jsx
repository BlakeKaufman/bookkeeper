import { useEffect, useState } from "react";

export default function LoadSuggestedBook(props) {
  const [cover, setCover] = useState("");

  useEffect(() => {
    fetch(`https://covers.openlibrary.org/b/id/${props.cover_id}-M.jpg`).then(
      (response) => setCover(response.url)
    );
  }, []);

  return (
    <div onClick={props.onClick} className="book">
      <img
        src={cover}
        alt={`book cover img for ${props.title} book`}
        className={props.cover_id}
      />
    </div>
  );
}
