import "../../styles/pages/Quiz/AI.css";

import Alert from "../../components/Alert";
import Ans from "../../components/button/Ans";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import SaveIcon from "../../assets/icon/icon_save.svg";
import ThumbIcon1 from "../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../assets/icon/icon_thumb-down-selected.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// import testQuiz1 from "../../../../data/testQuiz1";

export default function AI() {
  const location = useLocation();
  const [quizIndex, setQuizIndex] = useState(0); // 다음 퀴즈를 가리키는 인덱스
  const [quizzes, setQuizzes] = useState(location.state.quiz); // 전체 퀴즈 배열을 state로 관리
  const [quiz, setQuiz] = useState(quizzes[quizIndex]); // 현재 퀴즈
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
  console.log(quiz);
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

  const isLastQuiz = quizIndex === location.state.quiz.length - 1;

  return (
    <div className="AI">
      <Header />
      <div className="AI__container">
        <div className="AI__wrapper">
          <div className="AI__icon">
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
          <p className="AI__question">{quiz.question}</p>
          <div
            className="AI__choice"
            onClick={() => handleSelection("A")}
            style={{
              color: selected === "A" ? selectedColor : "",
              fontWeight: selected === "A" ? "600" : "",
              pointerEvents: checkAns ? "none" : "auto",
            }}
          >
            A.&nbsp; {quiz.options[0]}
          </div>
          <div
            className="AI__choice"
            onClick={() => handleSelection("B")}
            style={{
              color: selected === "B" ? selectedColor : "",
              fontWeight: selected === "B" ? "600" : "",
              pointerEvents: checkAns ? "none" : "auto",
            }}
          >
            B.&nbsp; {quiz.options[1]}
          </div>
          <div
            className="AI__choice"
            onClick={() => handleSelection("C")}
            style={{
              color: selected === "C" ? selectedColor : "",
              fontWeight: selected === "C" ? "600" : "",
              pointerEvents: checkAns ? "none" : "auto",
            }}
          >
            C.&nbsp; {quiz.options[2]}
          </div>
          <div
            className="AI__choice"
            onClick={() => handleSelection("D")}
            style={{
              marginBottom: "4rem",
              color: selected === "D" ? selectedColor : "",
              fontWeight: selected === "D" ? "600" : "",
              pointerEvents: checkAns ? "none" : "auto",
            }}
          >
            D.&nbsp; {quiz.options[3]}
          </div>
          <Ans
            quizType="ai"
            setQuiz={setQuiz}
            selected={selected}
            setSelected={setSelected}
            answer={quiz.answer}
            handleResult={handleResult}
            checkAns={checkAns}
            setCheckAns={setCheckAns}
            dislike={dislike}
            quizIndex={quizIndex}
            setQuizIndex={setQuizIndex}
            last={isLastQuiz}
            quizzes={quizzes}
          />
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
  );
}
