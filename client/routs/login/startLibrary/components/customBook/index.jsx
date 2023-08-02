import "./index.css";
import AddBookPopup from "./components/custombookpage";

export default function LoadAddBookPopup(props) {
  return props.bookInformation.length === 0 ? (
    <AddBookPopup addBookToDB={props.addBookToDB} {...props} />
  ) : (
    <AddBookPopup {...props} bookId={props.bookInformation} />
  );
}
