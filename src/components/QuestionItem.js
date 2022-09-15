import React from "react";

function QuestionItem({ question, deleteQuestion, changeCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDefeat() {
    return deleteQuestion(question.id);
  }

  function handleChangeCorrectAnswer(e) {
    return changeCorrectAnswer(question.id, e.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChangeCorrectAnswer} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDefeat}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
