import Html5QrcodePlugin from "../../../../../components/QR_scanner";
import closeIcon from "../../../../../assets/images/icons/close.svg";
import "./index.css";
import { useState } from "react";

export default function ScanBaracodePopup(props) {
  const popupStyle = {
    top: props.popupDisplayed ? "0" : "100%",
  };

  const [ISBN, setISBN] = useState({ isbn: null });

  function loadISBN(isbn) {
    setISBN(isbn);
    sendISBN(isbn);
  }
  console.log(ISBN);

  function sendISBN(isbn) {
    console.log("send");
    // API CALL WILL GO HERE
  }

  return (
    <div style={popupStyle} className="scan_barcode_popup">
      <div className="topbar">
        <h1>Scan Baracode</h1>
        <div onClick={props.togglePopup} className="icon">
          <img
            src={closeIcon}
            className="barcodeScanner"
            alt="close icon to close custom book section"
          />
        </div>
      </div>

      {ISBN.isbn !== null ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          isScanned={loadISBN}
        />
      )}
    </div>
  );
}
