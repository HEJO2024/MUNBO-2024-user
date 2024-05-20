import "../styles/components/Solve.css";

import CloseIcon from "../assets/icon/icon_close.svg";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Solve({ setViewSolve, answer, solve, subject }) {
  const [animationClass, setAnimationClass] = useState("");
  const closePopUp = () => {
    setAnimationClass("slide-out-bottom");
    setTimeout(() => {
      setViewSolve(false);
    }, 1200);
  };

  const solveColors = {
    "소프트웨어 설계": "rgba(255, 250, 229, 0.98)",
    "소프트웨어 개발": "#FFF5F8",
    "데이터베이스 구축": "#F6F7E8",
    "프로그래밍언어 활용": "#F8F1FE",
    "정보시스템 구축 관리": "#F3F9FB",
  };

  const subjectIndexes = {
    "소프트웨어 설계": 1,
    "소프트웨어 개발": 2,
    "데이터베이스 구축": 3,
    "프로그래밍언어 활용": 4,
    "정보시스템 구축 관리": 5,
  };

  const solveColor = solveColors[subject];
  const subjectIndex = subjectIndexes[subject];

  return (
    <div className={`solve slide-in-bottom ${animationClass}`}>
      <div className="solve__wrapper" style={{ backgroundColor: solveColor }}>
        <div className="solve__top">
          <img
            src={CloseIcon}
            alt="닫기"
            style={{ width: "20px", height: "19.2px", cursor: "pointer" }}
            onClick={closePopUp}
          ></img>
        </div>
        <div className={`solve__content solve__content${subjectIndex}`}>
          <p className="solve__ans">정답 : {answer}</p>
          <div className="solve__solution">{solve}</div>
        </div>
      </div>
    </div>
  );
}

Solve.propTypes = {
  setViewSolve: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
  solve: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};
