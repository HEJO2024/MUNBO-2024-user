import "../../styles/pages/Quiz/Saved.css";

import Alert from "../../components/Alert";
import Ans from "../../components/button/Ans";
import Empty from "../../components/Empty";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Solve from "../../components/Solve";
import ThumbIcon1 from "../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../assets/icon/icon_thumb-down-selected.svg";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Saved() {
  const location = useLocation();
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState(location.state.quiz);
  const [quiz, setQuiz] = useState(quizzes[quizIndex]);
  const [veiwSolve, setVeiwSolve] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#006D77");
  const [checkAns, setCheckAns] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  const handleSelection = (option) => {
    if (!checkAns) {
      setSelected(option);
    }
  };

  const handleResult = (color) => {
    setSelectedColor(color);
  };

  const isLastQuiz = quizIndex === location.state.quiz.length - 1;

  return (
    <>
      <div className={`saved ${veiwSolve && "saved-hidden-scroll"}`}>
        <Header />
        <div className="saved__container">
          <div className="saved__wrapper">
            {quizzes.length === 0 ? (
              <Empty message="저장된 문제가 없어요." />
            ) : (
              <>
                <div className="saved__top">
                  <div className="saved__icon">
                    {!dislike ? (
                      <img
                        src={ThumbIcon1}
                        alt="비추천"
                        onClick={() => setDislike(true)}
                      ></img>
                    ) : (
                      <img
                        src={ThumbIcon2}
                        alt="비추천"
                        onClick={() => setDislike(false)}
                      ></img>
                    )}
                  </div>
                </div>
                <p className="saved__info">AI가 만든 문제</p>
                <p className="saved__question">{quiz.quizContent}</p>
                <div
                  className="saved__choice"
                  onClick={() => handleSelection("A")}
                  style={{
                    color: selected === "A" ? selectedColor : "",
                    fontWeight: selected === "A" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  A.&nbsp; {quiz.answ.answ_1}
                </div>
                <div
                  className="saved__choice"
                  onClick={() => handleSelection("B")}
                  style={{
                    color: selected === "B" ? selectedColor : "",
                    fontWeight: selected === "B" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  B.&nbsp; {quiz.answ.answ_2}
                </div>
                <div
                  className="saved__choice"
                  onClick={() => handleSelection("C")}
                  style={{
                    color: selected === "C" ? selectedColor : "",
                    fontWeight: selected === "C" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  C.&nbsp;{quiz.answ.answ_3}
                </div>
                <div
                  className="saved__choice"
                  onClick={() => handleSelection("D")}
                  style={{
                    marginBottom: "4rem",
                    color: selected === "D" ? selectedColor : "",
                    fontWeight: selected === "D" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  D.&nbsp; {quiz.answ.answ_4}
                </div>
                <Ans
                  quizType={location.state.quizType}
                  setVeiwSolve={setVeiwSolve}
                  setQuiz={setQuiz}
                  selected={selected}
                  setSelected={setSelected}
                  answer={quiz.r_answ}
                  handleResult={handleResult}
                  checkAns={checkAns}
                  setCheckAns={setCheckAns}
                  dislike={dislike}
                  setDislike={setDislike}
                  quizIndex={quizIndex}
                  setQuizIndex={setQuizIndex}
                  last={isLastQuiz}
                  quizzes={quizzes}
                  quizId={quiz.quizId}
                  setShowAlert={setShowAlert}
                />
              </>
            )}
          </div>
        </div>
        <MenuBar icon="quiz" />
        {showAlert.message && (
          <Alert
            message={showAlert.message}
            type={showAlert.type}
            okHandler={showAlert.okHandler}
            cancelHandler={showAlert.cancelHandler}
          />
        )}
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
