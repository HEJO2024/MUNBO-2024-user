import "../../../../styles/pages/Note/Quiz/Type/TF.css";

import Alert from "../../../../components/Alert";
import Ans from "../../../../components/button/Ans";
import False from "../../../../assets/false.svg";
import Header from "../../../../components/Header";
import MenuBar from "../../../../components/MenuBar";
import SaveIcon from "../../../../assets/icon/icon_save.svg";
import ThumbIcon1 from "../../../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../../../assets/icon/icon_thumb-down-selected.svg";
import True from "../../../../assets/true.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function TF() {
  const location = useLocation();
  const [quizIndex, setQuizIndex] = useState(0); // 다음 퀴즈를 가리키는 인덱스
  const [quizzes, setQuizzes] = useState(location.state.quiz); // 전체 퀴즈 배열을 state로 관리
  const [quiz, setQuiz] = useState(quizzes[quizIndex]); // 현재 퀴즈
  const [checkAns, setCheckAns] = useState(false);
  const [selected, setSelected] = useState("");
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
    <div className="TF">
      <Header />
      <div className="TF__container">
        <div className="TF__wrapper">
          <div className="TF__icon">
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
          <p className="TF__question">{quiz.question}</p>
          <div className="TF__options">
            {checkAns ? (
              selected === "O" ? (
                <img src={True} alt="True" className="TF__selected" />
              ) : (
                <img src={False} alt="False" className="TF__selected" />
              )
            ) : (
              <>
                <img
                  src={True}
                  alt="True"
                  style={{ marginRight: "6rem" }}
                  className={selected === "O" ? "TF__selected" : ""}
                  onClick={() => handleSelection("O")}
                />
                <img
                  src={False}
                  alt="False"
                  className={selected === "X" ? "TF__selected" : ""}
                  onClick={() => handleSelection("X")}
                />
              </>
            )}
          </div>
          <Ans
            quizType="note-TF"
            setQuiz={setQuiz}
            selected={selected}
            setSelected={setSelected}
            answer={quiz.answer}
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
  );
}
