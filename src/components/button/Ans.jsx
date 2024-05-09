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
  quizId,
  quizIndex,
  setQuizIndex,
  quizzes,
  userAns,
}) {
  const navigate = useNavigate();
  const [correctNum, setCorrectNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);

  const handleCheckAns = () => {
    if (quizType === "note-Essay") {
      axios
        .post("/api/summaryNote/quiz_grading", {
          userAnsw: userAns,
          quizId: quizId,
        })
        .then((response) => {
          console.log(response);
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
    if (quizType === "note-MCQ" || quizType === "test" || quizType === "ai") {
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
      if (selected === answer || selected === answer[0]) {
        setCorrectNum(correctNum + 1);
        setTotalNum(totalNum + 1);
      } else {
        setTotalNum(totalNum + 1);
      }
    }
  };

  const handleNext = () => {
    const token = sessionStorage.getItem("token");
    if (quizType === "test") {
      axios
        .get("/api/quiz/test_next", {
          params: {
            quizId: quizId,
            userAnsw: selected,
            is_correct: selected === answer,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setQuiz(response.data.quizData);
            setLast(response.data.lastQuiz);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setCheckAns(false);
      handleResult("#006D77");
      setSelected(0);
    }
    if (quizType === "note-MCQ" || quizType === "ai") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
              handleResult("#006D77");
              setSelected(0);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "note-Essay") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (quizType === "note-TF") {
      axios
        .post("/api/quiz/ai_assessment", {
          userAssessment: dislike,
          quizId: quizId,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const nextIndex = quizIndex + 1;
            if (nextIndex < quizzes.length) {
              setQuizIndex(nextIndex);
              setQuiz(quizzes[nextIndex]);
              setCheckAns(false);
              setSelected("");
            }
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
  };

  return (
    <div className="ans">
      {!checkAns ? (
        <button className="ans__btn" onClick={handleCheckAns}>
          정답 확인
        </button>
      ) : (
        <>
          {quizType === "test" && (
            <button
              className="ans__btn"
              style={{ marginRight: "1rem" }}
              onClick={() => setVeiwSolve(true)}
            >
              해설보기
            </button>
          )}
          <button
            className="ans__btn ans__btn--next"
            onClick={last ? handleQuit : handleNext}
          >
            {!last ? "다음" : "종료"}
          </button>
        </>
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
};
