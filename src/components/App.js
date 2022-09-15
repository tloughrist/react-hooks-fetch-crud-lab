import React, { useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionData, setQuestionData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        setIsLoaded(true);
      })
  }, []);

  function returnNewQuestion(question) {
    return setQuestionData([...questionData, question]);
  }

  function deleteQuestion(delId) {
    setQuestionData(questionData.filter((question) => {
      return question.id !== delId;
    }))
    fetch(`http://localhost:4000/questions/${delId}`, {
    method: "DELETE",
    })
  
  }

  function changeCorrectAnswer(changeId, newIndex) {
    const updatedQuestion = questionData.filter((question) => {
      return question.id === changeId;
    })
    updatedQuestion.correctIndex = newIndex;
    setQuestionData(questionData.filter((question) => {
      if (question.id === changeId) {
        return updatedQuestion;
      } else {
        return question
      }
    }));
    fetch(`http://localhost:4000/questions/${changeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        correctIndex: newIndex,
      }),
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm newQuestion={returnNewQuestion}/> : <QuestionList questionData={questionData} isLoaded={isLoaded} deleteQuestion={deleteQuestion} changeCorrectAnswer={changeCorrectAnswer}/>}
    </main>
  );
}

export default App;
