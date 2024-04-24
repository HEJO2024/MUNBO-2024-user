import "../../styles/pages/Quiz/Quiz.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();

  return (
    <div className="quiz">
      <Header />
      <div className="quiz__container">
        <div className="quiz__wrapper">
          <button
            className="quiz__btn--aiquiz"
            onClick={() => navigate("/quiz/select")}
          >
            AI 생성 문제 풀기
          </button>
          <button
            className="quiz__btn--save"
            onClick={() => navigate("/quiz/select")}
          >
            저장한 문제
          </button>
          <button
            className="quiz__btn--test"
            onClick={() => navigate("/quiz/select")}
          >
            진단평가 받기
          </button>
        </div>
      </div>
      <MenuBar icon="quiz" />
    </div>
  );
}
