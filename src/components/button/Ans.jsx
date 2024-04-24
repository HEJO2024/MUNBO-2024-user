import "../../styles/components/button/Ans.css";

import PropTypes from "prop-types";
import axios from "axios";
import testQuiz2 from "../../data/testQuiz2";
import { useState } from "react";

export default function Ans({ setVeiwSolve, setQuiz }) {
  const [checkAns, setCheckAns] = useState(false);

  const handleNext = async () => {
    // try {
    //   const response = await axios.get("");
    //   setQuiz(response.data.quiz);
    // } catch (error) {
    //   console.error(error);
    //   return null;
    // }
    setQuiz(testQuiz2);
  };

  return (
    <div className="ans">
      {!checkAns ? (
        <button className="ans__btn" onClick={() => setCheckAns(true)}>
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
          <button className="ans__btn ans__btn--next" onClick={handleNext}>
            다음
          </button>
        </>
      )}
    </div>
  );
}

Ans.propTypes = {
  setVeiwSolve: PropTypes.func.isRequired,
  setQuiz: PropTypes.func.isRequired,
};
