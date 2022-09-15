import React from "react";
import QuestionItem from "./QuestionItem.js";

let questionArr = [];

function QuestionList({ isLoaded, questionData, deleteQuestion, changeCorrectAnswer }) {
  
  if (!isLoaded) return <h3>Questions Loading...</h3>;

  if (typeof questionData === "object") {
    questionArr = questionData.map((question) => {
      return <QuestionItem key={question.id} question={question} deleteQuestion={deleteQuestion} changeCorrectAnswer={changeCorrectAnswer}/>
    })
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionArr}</ul>
    </section>
  );
}

export default QuestionList;
