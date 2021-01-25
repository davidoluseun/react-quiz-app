import React from "react";
import ReactDOM from "react-dom";

const Popup = ({ isVisible, title, text, btnText, onStartQuiz }) => {
  // Set popup display style
  const display = isVisible ? "flex" : "none";

  return ReactDOM.createPortal(
    <div className="popup" style={{ display }}>
      <div className="popup-content rounded bg-white text-dark text-center w-50">
        <h1 className="h4 rounded-top bg-primary text-white p-3 mb-0">
          {title}
        </h1>
        <div className="p-3">
          <p>{text}</p>
          <button className="btn btn-primary" onClick={onStartQuiz}>
            {btnText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Popup;
