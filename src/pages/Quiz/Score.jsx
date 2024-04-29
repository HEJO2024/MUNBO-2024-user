import "../../styles/pages/Quiz/Score.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import SmileImg from "../../assets/smile.svg";
import { useLocation } from "react-router-dom";

export default function Score() {
  const location = useLocation();
  const { quizType, correctNum, totalNum } = location.state;

  return (
    <div className="score">
      <Header />
      <div className="score__container">
        <div className="score__wrapper">
          <p className="score__text">
            <span>맞은 개수</span>
            <img src={SmileImg} alt="스마일"></img>
          </p>
          <span className="score__num">
            {correctNum}&nbsp; / &nbsp;{totalNum}
          </span>
          <button>
            {quizType === "test"
              ? "자격증 대비 하러가기"
              : "저장한 문제 보러가기"}
          </button>
        </div>
      </div>
      <MenuBar
        icon={quizType === "test" || quizType === "ai" ? "quiz" : "note"}
      />
    </div>
  );
}
