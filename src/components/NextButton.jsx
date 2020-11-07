import React from "react";

const NextButton = ({
  onNextQuestion,
  isAnswered,
  totalQuestions,
  questionNumber,
}) => {
  // Set disabled attribute value
  const isDisabled = !isAnswered ? true : false;

  return (
    <button
      onClick={onNextQuestion}
      className="btn btn-primary my-5"
      disabled={isDisabled}
    >
      {questionNumber === totalQuestions && !isDisabled ? "Get Grade" : "Next"}
    </button>
  );
};

export default NextButton;
