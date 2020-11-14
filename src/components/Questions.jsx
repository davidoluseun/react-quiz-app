import React from "react";

const Questions = ({
  questionNumber,
  totalQuestions,
  currentQuestion,
  score,
}) => {
  return (
    <div className="bg-primary p-3 mb-4">
      <div className="d-flex justify-content-between">
        <div>Score: {score}</div>
        <div>
          {questionNumber} / {totalQuestions}
        </div>
      </div>
      <p
        className="text-center"
        dangerouslySetInnerHTML={{ __html: currentQuestion }}
      />
    </div>
  );
};

export default Questions;
