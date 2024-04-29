import "../../../../styles/pages/Note/Quiz/Type/MCQ.css";

import Alert from "../../../../components/Alert";
import Ans from "../../../../components/button/Ans";
import Header from "../../../../components/Header";
import MenuBar from "../../../../components/MenuBar";
import SaveIcon from "../../../../assets/icon/icon_save.svg";
import Solve from "../../../../components/Solve";
import ThumbIcon1 from "../../../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../../../assets/icon/icon_thumb-down-selected.svg";
import axios from "axios";
import testQuiz1 from "../../../../data/testQuiz1";
import { useState } from "react";

// import { useLocation } from "react-router-dom";

export default function MCQ() {
  // const location = useLocation();
  const [quiz, setQuiz] = useState(testQuiz1);
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

  const handleSaveBtn = () => {
    setShowAlert({
      message: "문제를 저장할까요?",
      type: "",
      okHandler: () => handleSave,
      cancelHandler: () =>
        setShowAlert({
          message: "",
        }),
    });
  };

  const handleSave = () => {
    axios
      .post("", {})
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "저장되었습니다!",
            type: "ok",
            okHandler: () => setShowAlert({ message: "" }),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={`MCQ ${veiwSolve && "MCQ-hidden-scroll"}`}>
        <Header />
        <div className="MCQ__container">
          <div className="MCQ__wrapper">
            <div className="MCQ__icon">
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
              <img
                src={SaveIcon}
                alt="저장"
                style={{ marginLeft: "0.5rem" }}
                onClick={handleSaveBtn}
              ></img>
            </div>
            <p className="MCQ__question">{quiz.question}</p>
            {quiz.questionImg_url && (
              <img src={quiz.questionImg_url} alt="이미지" />
            )}
            <div
              className="MCQ__choice"
              onClick={() => handleSelection(1)}
              style={{
                color: selected === 1 ? selectedColor : "",
                fontWeight: selected === 1 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
              }}
            >
              ①&nbsp; {quiz.options[0]}
            </div>
            <div
              className="MCQ__choice"
              onClick={() => handleSelection(2)}
              style={{
                color: selected === 2 ? selectedColor : "",
                fontWeight: selected === 2 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
              }}
            >
              ②&nbsp; {quiz.options[1]}
            </div>
            <div
              className="MCQ__choice"
              onClick={() => handleSelection(3)}
              style={{
                color: selected === 3 ? selectedColor : "",
                fontWeight: selected === 3 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
              }}
            >
              ③&nbsp; {quiz.options[2]}
            </div>
            <div
              className="MCQ__choice"
              onClick={() => handleSelection(4)}
              style={{
                marginBottom: "4rem",
                color: selected === 4 ? selectedColor : "",
                fontWeight: selected === 4 ? "600" : "",
                pointerEvents: checkAns ? "none" : "auto",
              }}
            >
              ④&nbsp; {quiz.options[3]}
            </div>
            <Ans
              quizType="note"
              setVeiwSolve={setVeiwSolve}
              setQuiz={setQuiz}
              selected={selected}
              setSelected={setSelected}
              answer={quiz.answer}
              handleResult={handleResult}
              checkAns={checkAns}
              setCheckAns={setCheckAns}
              last={quiz.last}
              dislike={dislike}
            />
          </div>
        </div>
        <MenuBar icon="note" />
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
          answer={quiz.options[quiz.answer - 1]}
          solve={quiz.solve}
        />
      )}
    </>
  );
}
