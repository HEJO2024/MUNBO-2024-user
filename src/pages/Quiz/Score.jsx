import "../../styles/pages/Quiz/Score.css";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import SmileImg from "../../assets/smile.svg";
import axios from "axios";

export default function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType, correctNum, totalNum } = location.state;

  const btnHandler = () => {
    const token = sessionStorage.getItem("token");
    if (quizType === "test") {
      navigate("/quiz/select", { state: { quizType: "ai" } });
    }
    if (quizType === "ai") {
      axios
        .get("/api/quiz/note/ai_view", {
          params: { is_summary: 0 },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/quiz/ai-saved", {
              state: { quiz: response.data.quizData, quizType: "saved-ai" },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
    }
    if (
      quizType === "note-MCQ" ||
      quizType === "note-Essay" ||
      quizType === "note-TF"
    ) {
      navigate("/note");
    }
  };

  return (
    <div className="score">
      <Header />
      <div className="score__container">
        <div className="score__wrapper">
          <p className="score__text">
            <span>맞은 개수</span>
            <img src={SmileImg} alt="스마일"></img>
          </p>
          {quizType === "test" ? (
            <span className="score__num">38&nbsp; / &nbsp;50</span>
          ) : (
            <span className="score__num">7&nbsp; / &nbsp;12</span>
          )}
          <button onClick={btnHandler}>
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
