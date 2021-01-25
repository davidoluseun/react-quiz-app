import React, { Component } from "react";
import axios from "axios";
import Questions from "./Questions";
import Options from "./Options";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Popup from "./Popup";
import Error from "./Error";

class Quiz extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    currentQuestion: "",
    options: [],
    correctOption: 0,
    rightWrongClass: [],
    score: 0,
    totalQuestions: 0,
    isAnswered: false,
    popupIsVisible: true,
    popupTitle: "Welcome!",
    popupText:
      "This is a Quiz App built with ReactJS. Click on the Start Quiz button to take the quiz",
    popupBtnText: "Start Quiz",
    loadingQuestions: false,
  };

  componentDidMount() {
    // Set loadingQuestions to true
    this.setState({ loadingQuestions: true });

    // Fetch questions
    axios
      .get(
        "https://opentdb.com/api.php?amount=15&category=17&difficulty=medium&type=multiple"
      )
      .then((res) => res.data.results)
      .then((loadedQuestions) => {
        // Transform the questions format, map over each question
        const questions = loadedQuestions.map((loadedQuestion) => {
          const questionObj = {
            question: loadedQuestion.question,
          };

          // Clone incorrect answers
          const options = [...loadedQuestion.incorrect_answers];

          // Generate a random index from 1 and 4
          questionObj.answerIndex = Math.floor(Math.random() * (4 - 1 + 1) + 1);

          // Set correct_answers in options
          options.splice(
            questionObj.answerIndex - 1,
            0,
            loadedQuestion.correct_answer
          );

          // Set options and correct_answer in questionObj
          questionObj.options = options;
          questionObj.correct_answer = loadedQuestion.correct_answer;

          return questionObj;
        });

        // Update the state and call getCurrentQuestion to display the first question
        const { questionNumber } = this.state;

        this.setState(
          {
            loadingQuestions: false,
            questions,
            totalQuestions: questions.length,
          },
          () => {
            this.getCurrentQuestion(questionNumber);
          }
        );
      })
      .catch((error) => {
        this.setState({
          errorMsg: "Ooop! An error occur, couldn't fetch questions",
        });
      });
  }

  // Grab the current question
  getCurrentQuestion(item) {
    const { questions, questionNumber } = this.state;

    this.setState({
      // Set the properties of the current question
      currentQuestion: questions[item].question,
      options: [...questions[item].options],
      correctOption: questions[item].answerIndex,
      rightWrongClass: ["", "", "", ""],

      // Set some properties of the next question
      questionNumber: questionNumber + 1,
      isAnswered: false,
    });
  }

  // Start the quiz
  handleStartQuiz = () => {
    const {
      questionNumber,
      totalQuestions,
      loadingQuestions,
      popupIsVisible,
    } = this.state;

    // If app is at the last question, not loading questions and popup is visible
    if (
      questionNumber === totalQuestions &&
      popupIsVisible &&
      !loadingQuestions
    ) {
      window.location.reload();
    } else {
      // else close popup
      this.setState({ popupIsVisible: !popupIsVisible });
    }
  };

  // HandleAnswer
  handleAnswer = (i) => {
    const { correctOption, score, isAnswered } = this.state;
    const rightWrongClass = [...this.state.rightWrongClass];
    const choiceIndex = i + 1;
    const correctIndex = correctOption - 1;

    // Check if the chosen option is correct and the question hasn't been answered
    if (choiceIndex === correctOption && !isAnswered) {
      rightWrongClass[i] = "right";

      this.setState({
        score: score + 1,
        isAnswered: !isAnswered,
        rightWrongClass,
      });

      // else if the chosen option is wrong and the question hasn't been answered
    } else if (!isAnswered) {
      rightWrongClass[i] = "wrong";
      rightWrongClass[correctIndex] = "right";

      this.setState({
        isAnswered: !isAnswered,
        rightWrongClass,
      });
    }
  };

  // HandleNextQuestion
  handleNextQuestion = () => {
    const {
      questionNumber,
      score,
      totalQuestions,
      popupIsVisible,
    } = this.state;

    // If app is at the last question
    if (questionNumber === totalQuestions) {
      // compute grade
      let grade = (score / totalQuestions) * 100;
      grade = grade.toFixed(2);

      // set variables for popup
      let popupTitle;
      const popupText = `Your grade is ${grade}% `;
      const popupBtnText = "Restart";

      // generate popupTitle base on grade
      if (grade < 40) {
        popupTitle = "Poor!";
      } else if (grade >= 40 && grade < 50) {
        popupTitle = "Fair!";
      } else if (grade >= 50 && grade < 75) {
        popupTitle = "Good!";
      } else {
        popupTitle = "Awesome!";
      }

      // update the state to display popup
      this.setState({
        popupIsVisible: !popupIsVisible,
        popupTitle,
        popupText,
        popupBtnText,
      });
    } else {
      // else get next question
      this.getCurrentQuestion(questionNumber);
    }
  };

  render() {
    const {
      currentQuestion,
      questionNumber,
      score,
      totalQuestions,
      options,
      rightWrongClass,
      isAnswered,
      popupIsVisible,
      popupTitle,
      popupText,
      popupBtnText,
      loadingQuestions,
      errorMsg,
    } = this.state;

    return (
      <>
        {loadingQuestions || errorMsg ? (
          <Error errorMsg={errorMsg} />
        ) : (
          <section className="container my-5">
            <Questions
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
              currentQuestion={currentQuestion}
              score={score}
            />
            <Options
              options={options}
              rightWrongClass={rightWrongClass}
              onAnswer={this.handleAnswer}
            />
            <NextButton
              isAnswered={isAnswered}
              totalQuestions={totalQuestions}
              questionNumber={questionNumber}
              onNextQuestion={this.handleNextQuestion}
            />
          </section>
        )}

        <Footer />
        <Popup
          isVisible={popupIsVisible}
          title={popupTitle}
          text={popupText}
          btnText={popupBtnText}
          onStartQuiz={this.handleStartQuiz}
        />
      </>
    );
  }
}

export default Quiz;
