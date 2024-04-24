import "../../styles/pages/Quiz/Test.css";

import Ans from "../../components/button/Ans";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Solve from "../../components/Solve";
import testQuiz1 from "../../data/testQuiz1";
import { useState } from "react";

// import { useLocation } from "react-router-dom";

export default function Test() {
  // const location = useLocation();
  const [quiz, setQuiz] = useState(testQuiz1);
  const [veiwSolve, setVeiwSolve] = useState(false);

  return (
    <>
      <div className={`test ${veiwSolve && "test-hidden-scroll"}`}>
        <Header />
        <div className="test__container">
          <div className="test__wrapper">
            <div className="test__subject">{quiz.subject}</div>
            <p className="test__question">{quiz.question}</p>
            <div className="test__choice">① {quiz.options[0]}</div>
            <div className="test__choice">② {quiz.options[1]}</div>
            <div className="test__choice">③ {quiz.options[2]}</div>
            <div className="test__choice" style={{ marginBottom: "4rem" }}>
              ④ {quiz.options[3]}
            </div>
            <Ans setVeiwSolve={setVeiwSolve} setQuiz={setQuiz} />
          </div>
        </div>
        <MenuBar icon="quiz" />
      </div>
      {veiwSolve && (
        <Solve
          setViewSolve={setVeiwSolve}
          answer={quiz.answer}
          solve={quiz.solve}
        />
      )}
    </>
  );
}
