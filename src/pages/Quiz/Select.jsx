import "../../styles/pages/Quiz/Select.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import BackIcon from "../../assets/icon/icon_back.svg";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function Select() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizType = location.state.quizType;
  const [certificate, setCertificate] = useState("");
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const [loading, setLoading] = useState(false);

  const handleBtn = () => {
    if (!certificate) {
      setShowAlert({
        message: "자격증을 선택해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
    } else {
      const token = sessionStorage.getItem("token");
      if (quizType === "ai") {
        setLoading(true);
        axios
          .get("/api/quiz/check_quizLog", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response);
            if (response.status === 200) {
              if (response.data.quizLog) {
                axios
                  .get("/api/quiz/ai_solve", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                      navigate("/quiz/ai", {
                        state: {
                          quiz: response.data.aiQuiz,
                          quizType: quizType,
                        },
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    if (error.response && error.response.status === 401) {
                      navigate("/login");
                    }
                  })
                  .finally(() => setLoading(false));
              } else {
                navigate("/quiz/go-test");
              }
            }
          })
          .catch((error) => console.log(error));
      } else if (quizType === "saved-ai") {
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
      } else if (quizType === "test") {
        axios
          .get("/api/quiz/test_solve")
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              navigate("/quiz/test", {
                state: {
                  quiz: response.data.quizData,
                  last: response.data.lastQuiz,
                },
              });
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <div className="select">
      <Header />
      <div className="select__container">
        <div className="select__wrapper">
          <div className="select__top">
            <img
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            ></img>
          </div>
          <Dropdown
            message="자격증을 선택해주세요."
            options={[
              "정보처리기사",
              "정보통신기사",
              "정보보안기사",
              "전기기사",
            ]}
            defaultOption="선택"
            onSelect={(option) => setCertificate(option)}
          />
          <button className="select__btn" onClick={handleBtn}>
            선택 완료
          </button>
        </div>
      </div>
      <MenuBar icon="quiz" />
      {showAlert.message && (
        <Alert
          message={showAlert.message}
          type={showAlert.type}
          okHandler={showAlert.okHandler}
          cancelHandler={showAlert.cancelHandler}
        />
      )}
      {loading && (
        <Loading
          message={`${sessionStorage.getItem(
            "userName"
          )}님이 틀린 문제를 기반으로 문제를 생성하고 있어요 😃`}
        />
      )}
    </div>
  );
}
