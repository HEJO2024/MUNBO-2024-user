import "../../styles/pages/Quiz/Quiz.css";

import BtnInfo from "../../assets/btn-info.svg";
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
          <div className="quiz__info">
            <img src={BtnInfo} alt="설명"></img>
          </div>
          <button
            className="quiz__btn--aiquiz"
            onClick={() =>
              navigate("/quiz/select", { state: { quizType: "ai" } })
            }
          >
            AI가 만든 문제 풀러가기
          </button>
          <button
            className="quiz__btn--save"
            onClick={() =>
              navigate("/quiz/select", { state: { quizType: "saved-ai" } })
            }
          >
            내가 저장한 문제
          </button>
          <button
            className="quiz__btn--test"
            onClick={() =>
              navigate("/quiz/select", { state: { quizType: "test" } })
            }
          >
            진단평가 받기
          </button>
        </div>
      </div>
      <MenuBar icon="quiz" />
    </div>
  );
}
