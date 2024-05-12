import "../../styles/pages/Quiz/Test.css";

import Ans from "../../components/button/Ans";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Solve from "../../components/Solve";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Test() {
  const location = useLocation();
  const [quiz, setQuiz] = useState(location.state.quiz);
  const [veiwSolve, setVeiwSolve] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#006D77");
  const [checkAns, setCheckAns] = useState(false);
  const [last, setLast] = useState(location.state.last);

  const handleSelection = (option) => {
    if (!checkAns) {
      setSelected(option);
    }
  };

  const handleResult = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className={`test ${veiwSolve && "test-hidden-scroll"}`}>
        <Header />
        <div className="test__container">
          <div className="test__wrapper">
            {/* <div className="test__subject"></div> */}
            <p className="test__question">{quiz.quizContent}</p>
            {/* {quiz.quizImg && <img src={quiz.quizImg} alt="이미지" />} */}
            <div
              className="test__choice"
              onClick={() => handleSelection(1)}
              style={{
                color: selected === 1 ? selectedColor : "",
                fontWeight: selected === 1 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
                cursor: "pointer",
              }}
            >
              ①&nbsp; {quiz.answ_1}
            </div>
            <div
              className="test__choice"
              onClick={() => handleSelection(2)}
              style={{
                color: selected === 2 ? selectedColor : "",
                fontWeight: selected === 2 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
                cursor: "pointer",
              }}
            >
              ②&nbsp; {quiz.answ_2}
            </div>
            <div
              className="test__choice"
              onClick={() => handleSelection(3)}
              style={{
                color: selected === 3 ? selectedColor : "",
                fontWeight: selected === 3 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
                cursor: "pointer",
              }}
            >
              ③&nbsp; {quiz.answ_3}
            </div>
            <div
              className="test__choice"
              onClick={() => handleSelection(4)}
              style={{
                marginBottom: "4rem",
                color: selected === 4 ? selectedColor : "",
                fontWeight: selected === 4 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
                cursor: "pointer",
              }}
            >
              ④&nbsp; {quiz.answ_4}
            </div>
            <Ans
              quizType="test"
              setVeiwSolve={setVeiwSolve}
              setQuiz={setQuiz}
              selected={selected}
              setSelected={setSelected}
              answer={quiz.r_answ}
              handleResult={handleResult}
              checkAns={checkAns}
              setCheckAns={setCheckAns}
              last={last}
              setLast={setLast}
              quizId={quiz.quizId}
            />
          </div>
        </div>
        <MenuBar icon="quiz" />
      </div>
      {veiwSolve && (
        <Solve
          setViewSolve={setVeiwSolve}
          answer={quiz.r_answ}
          solve={quiz.wrgAnsw_explanation}
        />
      )}
    </>
  );
}
