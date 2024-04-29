import "../../../styles/pages/Note/Quiz/Settings.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../../components/Alert";
import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import MenuBar from "../../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [num, setNum] = useState(0);
  const [type, setType] = useState("");
  const [lang, setLang] = useState("");
  const [etc, setEtc] = useState("");
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const [quiz, setQuiz] = useState();

  const handleEtcChange = (e) => {
    setEtc(e.target.value);
  };
  const handleSubmit = () => {
    navigate("/note/quiz/MCQ");
    if (!num || !type || !lang || !etc) {
      setShowAlert({
        message: "모든 항목을 입력해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
      return;
    }
    // 요약노트 내용도 같이 보내기?
    axios
      .post("", {
        summaryId: location.state.summaryId,
        quizNum: num,
        quizType: type,
        summaryLanguage: lang,
        userRequest: etc,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setQuiz(response.data.quiz);
          if (type === "객관식(4지선다)") {
            navigate("/note/quiz/MCQ", { state: { quiz: quiz } });
          } else if (type == "주관식") {
            navigate("/note/quiz/essay", { state: { quiz: quiz } });
          } else if (type === "OX 퀴즈") {
            navigate("/note/quiz/TF", { state: { quiz: quiz } });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="settings">
      <Header />
      <div className="settings__container">
        <div className="settings__wrapper">
          <Dropdown
            message="문제 수"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultOption="문제 수를 선택해주세요."
            onSelect={(option) => setNum(option)}
          />
          <Dropdown
            message="문제 유형"
            options={["객관식(4지선다)", "주관식", "OX 퀴즈"]}
            defaultOption="문제 유형을 선택해주세요."
            onSelect={(option) => setType(option)}
          />
          <Dropdown
            message="언어"
            options={["한국어", "영어"]}
            defaultOption="언어를 선택해주세요."
            onSelect={(option) => setLang(option)}
          />
          <div className="settings__etc">
            <p>요구사항</p>
            <textarea
              placeholder="요구사항을 입력해주세요."
              onChange={handleEtcChange}
            ></textarea>
          </div>
          <button className="settings__btn" onClick={handleSubmit}>
            문제 생성
          </button>
        </div>
      </div>
      <MenuBar icon="note" />
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
