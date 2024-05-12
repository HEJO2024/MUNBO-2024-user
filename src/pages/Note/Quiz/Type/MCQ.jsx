import "../../../../styles/pages/Note/Quiz/Type/MCQ.css";

import Alert from "../../../../components/Alert";
import Ans from "../../../../components/button/Ans";
import Empty from "../../../../components/Empty";
import Header from "../../../../components/Header";
import MenuBar from "../../../../components/MenuBar";
import SaveIcon from "../../../../assets/icon/icon_save.svg";
import ThumbIcon1 from "../../../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../../../assets/icon/icon_thumb-down-selected.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// import testQuiz1 from "../../../../data/testQuiz1";

export default function MCQ() {
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
      okHandler: handleSave,
      cancelHandler: () =>
        setShowAlert({
          message: "",
        }),
    });
  };

  const handleSave = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/api/quiz/ai_save",
        { quizId: quiz.quizId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
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
    <div className="MCQ">
      <Header />
      <div className="MCQ__container">
        <div className="MCQ__wrapper">
          {quizzes.length === 0 ? (
            <Empty message="저장된 문제가 없어요." />
          ) : (
            <>
              <div className="MCQ__icon">
                {!dislike ? (
                  <img
                    src={ThumbIcon1}
                    alt="비추천"
                    onClick={() => setDislike(true)}
                    style={{ cursor: "pointer" }}
                  ></img>
                ) : (
                  <img
                    src={ThumbIcon2}
                    alt="비추천"
                    onClick={() => setDislike(false)}
                    style={{ cursor: "pointer" }}
                  ></img>
                )}
                {location.state.quizType !== "saved-MCQ" && (
                  <img
                    src={SaveIcon}
                    alt="저장"
                    style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                    onClick={handleSaveBtn}
                  ></img>
                )}
              </div>
              <p className="MCQ__question">{quiz.quizContent}</p>
              <div
                className="MCQ__choice"
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
                className="MCQ__choice"
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
                className="MCQ__choice"
                onClick={() => handleSelection("C")}
                style={{
                  color: selected === "C" ? selectedColor : "",
                  fontWeight: selected === "C" ? "600" : "",
                  pointerEvents: checkAns ? "none" : "auto",
                }}
              >
                C.&nbsp; {quiz.answ.answ_3}
              </div>
              <div
                className="MCQ__choice"
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
                noteId={location.state.noteId}
              />
            </>
          )}
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
