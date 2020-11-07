import React from "react";

const Options = ({ options, onAnswer, rightWrongClass }) => {
  // Set button classes
  const btnClasses = "list-group-item mt-4 text-left ";

  return (
    <div className="list-group">
      {options.map((option, i) => (
        <button
          onClick={() => onAnswer(i)}
          key={option}
          data-id={i}
          className={btnClasses + rightWrongClass[i]}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
