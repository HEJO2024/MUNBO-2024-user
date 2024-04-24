import "../styles/components/Solve.css";

import CloseIcon from "../assets/icon/icon_close.svg";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Solve({ setViewSolve, answer, solve }) {
  const [animationClass, setAnimationClass] = useState("");
  const closePopUp = () => {
    setAnimationClass("slide-out-bottom");
    setTimeout(() => {
      setViewSolve(false);
    }, 1200);
  };

  return (
    <div className={`solve slide-in-bottom ${animationClass}`}>
      <div className="solve__wrapper">
        <div className="solve__top">
          <img
            src={CloseIcon}
            alt="닫기"
            style={{ width: "20px", height: "19.2px", cursor: "pointer" }}
            onClick={closePopUp}
          ></img>
        </div>
        <div className="solve__content">
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
};
