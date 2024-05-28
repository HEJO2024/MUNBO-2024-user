import "../../../../styles/pages/Note/Quiz/Type/Essay.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../../../components/Alert";
import Ans from "../../../../components/button/Ans";
import BackIcon from "../../../../assets/icon/icon_back.svg";
import Empty from "../../../../components/Empty";
import Header from "../../../../components/Header";
import MenuBar from "../../../../components/MenuBar";
import SaveIcon from "../../../../assets/icon/icon_save.svg";
import ThumbIcon1 from "../../../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../../../assets/icon/icon_thumb-down-selected.svg";
import axios from "axios";
import { useState } from "react";

export default function Essay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizIndex, setQuizIndex] = useState(0); // 다음 퀴즈를 가리키는 인덱스
  const [quizzes, setQuizzes] = useState(location.state.quiz); // 전체 퀴즈 배열을 state로 관리
  const [quiz, setQuiz] = useState(quizzes[quizIndex]); // 현재 퀴즈
  const [checkAns, setCheckAns] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const [userAns, setUserAns] = useState("");
  const [totalNum, setTotalNum] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);

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
        "/api/quiz/note/ai_save",
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

  const userAnsChange = (e) => {
    setUserAns(e.target.value);
  };

  return (
    <div className="Essay">
      <Header />
      <div className="Essay__container">
        <div className="Essay__wrapper">
          {quizzes.length === 0 && (
            <div className="Essay__top">
              <img
                src={BackIcon}
                alt="뒤로가기"
                onClick={() => navigate(-1)}
              ></img>
            </div>
          )}
          {quizzes.length === 0 ? (
            <Empty message="저장된 문제가 없어요." />
          ) : (
            <>
              <div className="Essay__icon">
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
                {location.state.quizType !== "saved-Essay" && (
                  <img
                    src={SaveIcon}
                    alt="저장"
                    style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                    onClick={handleSaveBtn}
                  ></img>
                )}
              </div>
              <p className="Essay__info">AI가 만든 문제</p>
              <p className="Essay__question">{quiz.quizContent}</p>
              {!checkAns ? (
                <textarea
                  placeholder="답을 입력해주세요."
                  onChange={userAnsChange}
                ></textarea>
              ) : (
                <div className="Essay__answer">{quiz.r_answ}</div>
              )}
              <Ans
                quizType={location.state.quizType}
                setQuiz={setQuiz}
                answer={quiz.r_answ}
                checkAns={checkAns}
                setCheckAns={setCheckAns}
                dislike={dislike}
                setDislike={setDislike}
                quizIndex={quizIndex}
                setQuizIndex={setQuizIndex}
                last={isLastQuiz}
                quizzes={quizzes}
                userAns={userAns}
                quizId={quiz.quizId}
                setShowAlert={setShowAlert}
                totalNum={totalNum}
                correctNum={correctNum}
                setTotalNum={setTotalNum}
                setCorrectNum={setCorrectNum}
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
