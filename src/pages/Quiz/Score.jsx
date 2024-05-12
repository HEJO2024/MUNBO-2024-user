import "../../styles/pages/Quiz/Score.css";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import SmileImg from "../../assets/smile.svg";
import axios from "axios";

export default function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType, correctNum, totalNum, noteId } = location.state;

  const btnHandler = () => {
    const token = sessionStorage.getItem("token");
    if (quizType === "test") {
      navigate("/quiz/select", { state: { quizType: "ai" } });
    }
    if (quizType === "ai") {
      axios
        .get("/api/quiz/note/view", {
          params: { is_summary: 0 },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/quiz/ai", {
              state: { quiz: response.data.quizData, quizType: quizType },
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
      axios
        .get("/api/quiz/note/view", {
          params: { is_summary: 1 },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.quizData[0].quizType === 0) {
              navigate("/note/quiz/MCQ", {
                state: {
                  quiz: response.data.quizData,
                  quizType: "saved-MCQ",
                  noteId: noteId,
                },
              });
            } else if (response.data.quizData[0].quizType === 1) {
              navigate("/note/quiz/essay", {
                state: {
                  quiz: response.data.quizData,
                  quizType: "saved-Essay",
                  noteId: noteId,
                },
              });
            } else if (response.data.quizData[0].quizType === 2) {
              navigate("/note/quiz/TF", {
                state: {
                  quiz: response.data.quizData,
                  quizType: "saved-TF",
                  noteId: noteId,
                },
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          <span className="score__num">
            {correctNum}&nbsp; / &nbsp;{totalNum}
          </span>
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
