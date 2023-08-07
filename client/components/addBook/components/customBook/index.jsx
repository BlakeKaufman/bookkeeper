import "./index.css";
import AddBookPopup from "./components/custombookpage";

export default function LoadAddBookPopup(props) {
  return props.bookInformation.length === 0 ? (
    <AddBookPopup
      recalUserBooks={props.recalUserBooks}
      addBookToDB={props.addBookToDB}
      {...props}
    />
  ) : (
    <AddBookPopup
      recalUserBooks={props.recalUserBooks}
      {...props}
      bookId={props.bookInformation}
    />
  );
}
