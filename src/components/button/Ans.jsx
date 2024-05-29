import "../../styles/components/button/Ans.css";

import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Ans({
  quizType,
  setVeiwSolve,
  setQuiz,
  selected,
  setSelected,
  answer,
  handleResult,
  checkAns,
  setCheckAns,
  last,
  setLast,
  dislike,
  setDislike,
  quizId,
  quizIndex,
  setQuizIndex,
  quizzes,
  userAns,
  setShowAlert,
  setLoading,
  totalNum,
  correctNum,
  setTotalNum,
  setCorrectNum,
}) {
  const navigate = useNavigate();
  const userSelect = selected;
  const [isCorrect, setIsCorrect] = useState(0);

  const handleCheckAns = () => {
    if (quizType === "note-Essay") {
      axios
        .post("/api/summaryNote/quiz_grading", {
          userAnsw: userAns,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            setCheckAns(true);
            if (response.data.is_correct) {
              setCorrectNum(correctNum + 1);
              setTotalNum(totalNum + 1);
            } else {
              setTotalNum(totalNum + 1);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "note-TF") {
      setCheckAns(true);
      setSelected(answer);
      if (selected === answer) {
        setCorrectNum(correctNum + 1);
        setTotalNum(totalNum + 1);
      } else {
        setTotalNum(totalNum + 1);
      }
    }
    if (quizType === "test" || quizType === "note-MCQ" || quizType === "ai") {
      // if (selected === 0) {
      //   setSelected(answer);
      //   handleResult("#3A86FF");
      // } else {
      //   if (selected === answer) {
      //     setCorrectNum(correctNum + 1);
      //     setTotalNum(totalNum + 1);
      //     handleResult("#3A86FF");
      //   } else {
      //     setTotalNum(totalNum + 1);
      //     handleResult("#C93737");
      //   }
      // }
      // setCheckAns(true);

      setSelected(answer);
      handleResult("#3A86FF");
      setCheckAns(true);
      if (userSelect === answer) {
        setCorrectNum(correctNum + 1);
        setTotalNum(totalNum + 1);
        setIsCorrect(1);
      } else {
        setTotalNum(totalNum + 1);
        setIsCorrect(0);
      }
    }
    if (quizType === "saved-ai" || quizType === "saved-MCQ") {
      setSelected(answer);
      handleResult("#3A86FF");
      setCheckAns(true);
    }
    if (quizType === "saved-Essay") {
      setCheckAns(true);
    }
    if (quizType === "saved-TF") {
      setCheckAns(true);
      setSelected(answer);
    }
  };

  const handleNext = () => {
    const token = sessionStorage.getItem("token");
    if (quizType === "test") {
      console.log("userSelect", userSelect);
      console.log("answer", answer);
      console.log("isCorrect", isCorrect);
      axios
        .get("/api/quiz/test_next", {
          params: {
            quizId: quizId,
            userAnsw: userSelect,
            is_correct: isCorrect,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            setQuiz(response.data.quizData);
            setLast(response.data.lastQuiz);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
      setCheckAns(false);
      handleResult("#006D77");
      setSelected(0);
    }
    if (quizType === "ai") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            setLoading(true);
            axios
              .get("/api/quiz/ai_solve", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  setQuiz(response.data.aiQuiz);
                  setCheckAns(false);
                  handleResult("#006D77");
                  setSelected(0);
                }
              })
              .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                  navigate("/login");
                }
              })
              .finally(() => setLoading(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      quizType === "note-MCQ" ||
      quizType === "saved-MCQ" ||
      quizType === "saved-ai"
    ) {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
              handleResult("#006D77");
              setSelected(0);
              setDislike(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "note-Essay" || quizType === "saved-Essay") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
              setDislike(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "note-TF" || quizType === "saved-TF") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
              setSelected("");
              setDislike(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePrevious = () => {
    if (quizType === "saved-MCQ" || quizType === "saved-ai") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex - 1;
            setQuizIndex(nextIndex);
            setQuiz(quizzes[nextIndex]);
            setCheckAns(false);
            handleResult("#006D77");
            setSelected(0);
            setDislike(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "saved-Essay") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex - 1;
            setQuizIndex(nextIndex);
            setQuiz(quizzes[nextIndex]);
            setCheckAns(false);
            setDislike(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "saved-TF") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex - 1;
            setQuizIndex(nextIndex);
            setQuiz(quizzes[nextIndex]);
            setCheckAns(false);
            setSelected("");
            setDislike(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleQuit = () => {
    if (
      quizType === "test" ||
      quizType === "ai" ||
      quizType === "note-Essay" ||
      quizType === "note-MCQ" ||
      quizType === "note-TF"
    ) {
      navigate("/quiz/score", {
        state: {
          quizType: quizType,
          correctNum: correctNum,
          totalNum: totalNum,
        },
      });
    }
    if (quizType === "saved-ai") {
      navigate("/quiz");
    }
    if (
      quizType === "saved-MCQ" ||
      quizType === "saved-Essay" ||
      quizType === "saved-TF"
    ) {
      navigate("/note");
    }
  };

  const deleteQuiz = () => {
    axios
      .delete("/api/quiz/note/ai_delete", { data: { quizId: quizId } })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "삭제되었습니다!",
            type: "ok",
            okHandler: () => {
              if (last) {
                handleQuit();
              } else {
                handleNext();
              }
              setShowAlert({ message: "" });
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelBtn = () => {
    setShowAlert({
      message: "삭제하시겠습니까?",
      type: "",
      okHandler: deleteQuiz,
      cancelHandler: () => setShowAlert({ message: "" }),
    });
  };

  return (
    <div className="ans">
      {!checkAns ? (
        <>
          {(quizType === "saved-ai" ||
            quizType === "saved-MCQ" ||
            quizType === "saved-Essay" ||
            quizType === "saved-TF") && (
            <button
              className="ans__btn ans__btn--delete"
              onClick={handleDelBtn}
            >
              삭제
            </button>
          )}
          <button
            className="ans__btn"
            onClick={handleCheckAns}
            style={{ marginLeft: "1rem" }}
          >
            정답 확인
          </button>
        </>
      ) : (
        <div
          className="ans__btn-container"
          style={{
            justifyContent:
              (quizType === "saved-ai" ||
                quizType === "saved-MCQ" ||
                quizType === "saved-Essay" ||
                quizType === "saved-TF") &&
              quizIndex !== 0
                ? "space-between"
                : "",
          }}
        >
          {(quizType === "saved-ai" ||
            quizType === "saved-MCQ" ||
            quizType === "saved-Essay" ||
            quizType === "saved-TF") &&
            quizIndex !== 0 && (
              <button
                className="ans__btn ans__btn--previous"
                onClick={handlePrevious}
                style={{ backgroundColor: "#805b10", color: "#fae588" }}
              >
                이전
              </button>
            )}
          {(quizType === "test" || quizType === "ai") && (
            <button
              className="ans__btn ans__btn--solve"
              style={{ marginRight: "1rem", marginLeft: "1rem" }}
              onClick={() => setVeiwSolve(true)}
            >
              해설보기
            </button>
          )}
          <button
            className="ans__btn ans__btn--next"
            onClick={last ? handleQuit : handleNext}
            style={{ backgroundColor: "#805b10", color: "#fae588" }}
          >
            {!last ? "다음" : "종료"}
          </button>
        </div>
      )}
    </div>
  );
}

Ans.propTypes = {
  quizType: PropTypes.string.isRequired,
  setVeiwSolve: PropTypes.func.isRequired,
  setQuiz: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  answer: PropTypes.number.isRequired,
  handleResult: PropTypes.func.isRequired,
  checkAns: PropTypes.bool.isRequired,
  setCheckAns: PropTypes.func.isRequired,
  last: PropTypes.bool.isRequired,
  dislike: PropTypes.bool.isRequired,
  quizId: PropTypes.number.isRequired,
  quizIndex: PropTypes.number.isRequired,
  setQuizIndex: PropTypes.func.isRequired,
  quizzes: PropTypes.array.isRequired,
  setLast: PropTypes.func.isRequired,
  userAns: PropTypes.string.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  setDislike: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  summaryId: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  correctNum: PropTypes.number.isRequired,
  setCorrectNum: PropTypes.func.isRequired,
  totalNum: PropTypes.number.isRequired,
  setTotalNum: PropTypes.func.isRequired,
};
