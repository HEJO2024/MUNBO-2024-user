import "../../styles/components/button/Ans.css";

import PropTypes from "prop-types";
import testQuiz2 from "../../data/testQuiz2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import axios from "axios";

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
  dislike,
}) {
  const navigate = useNavigate();
  const [correctNum, setCorrectNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);

  const handleCheckAns = () => {
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
    if (selected === answer) {
      setCorrectNum(correctNum + 1);
      setTotalNum(totalNum + 1);
    } else {
      setTotalNum(totalNum + 1);
    }
  };

  const handleNext = () => {
    // axios
    //   .get("", {})
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       setQuiz(response.data.quiz);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setQuiz(testQuiz2);
    setCheckAns(false);
    handleResult("#006D77");
    setSelected(0);
  };

  const handleQuit = () => {
    if (quizType === "test" || quizType === "note") {
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
          <button
            className="ans__btn"
            style={{ marginRight: "1rem" }}
            onClick={() => setVeiwSolve(true)}
          >
            해설보기
          </button>
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
};
