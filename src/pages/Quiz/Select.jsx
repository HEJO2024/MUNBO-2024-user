import "../../styles/pages/Quiz/Select.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
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
  const [quiz, setQuiz] = useState();

  const handleBtn = () => {
    if (!certificate) {
      setShowAlert({
        message: "자격증을 선택해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
    } else {
      navigate("/quiz/go-test");
      const token = sessionStorage.getItem("token");
      if (quizType === "ai") {
        axios
          .post(
            "",
            { certificate: certificate },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            // 진단평가 안한 경우에는 quiz/test로 이동하도록, quiz/go-test로 자격증 정보 전달
            if (response.status === 200) {
              setQuiz(response.data.quiz);
              navigate("/quiz/ai", { state: { quiz: quiz } });
            }
          })
          .catch((error) => console.log(error));
      } else if (quizType === "save") {
        axios
          .post(
            "",
            { certificate: certificate },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setQuiz(response.data.quiz);
              navigate("/quiz/save", { state: { quiz: quiz } });
            }
          })
          .catch((error) => console.log(error));
      } else if (quizType === "test") {
        axios
          .post(
            "",
            { quizType: quizType, certificate: certificate },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setQuiz(response.data.quiz);
              navigate("/quiz/test", { state: { quiz: quiz } });
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
          <Dropdown
            message="자격증을 선택해주세요."
            options={["정보처리기사"]}
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
    </div>
  );
}
