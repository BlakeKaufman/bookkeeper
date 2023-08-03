import "./index.css";

import LoadAddBookPage from "../../../components/addBook";

export default function LoadStartLibrary() {
  function addUserToDB() {
    console.log("user Added");
  }
  return (
    <LoadAddBookPage
      addUserToDB={addUserToDB}
      path="login"
      heading="Start your Library"
      backButtonPath="/login/reminder"
    />
  );
}
