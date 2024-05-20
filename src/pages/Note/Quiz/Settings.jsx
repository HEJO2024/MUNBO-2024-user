import "../../../styles/pages/Note/Quiz/Settings.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../../components/Alert";
import BackIcon from "../../../assets/icon/icon_back.svg";
import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import MenuBar from "../../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [num, setNum] = useState(0);
  const [type, setType] = useState(null);
  const [lang, setLang] = useState("");
  const [etc, setEtc] = useState("");
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const [loading, setLoading] = useState(false);

  const handleEtcChange = (e) => {
    setEtc(e.target.value);
  };
  const handleSubmit = () => {
    if (num === 0 || type === null || !lang || !etc) {
      setShowAlert({
        message: "모든 항목을 입력해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
      return;
    }
    setLoading(true);
    axios
      .post("/api/summaryNote/quiz_solve", {
        summaryId: location.state.summaryId,
        quizNum: num,
        quizType: type,
        Q_language: lang,
        userRequirements: etc,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (type === 0) {
            navigate("/note/quiz/MCQ", {
              state: {
                quiz: response.data.quizData,
                quizType: "note-MCQ",
                summaryId: location.state.summaryId,
              },
            });
          } else if (type === 1) {
            navigate("/note/quiz/essay", {
              state: {
                quiz: response.data.quizData,
                quizType: "note-Essay",
                summaryId: location.state.summaryId,
              },
            });
          } else if (type === 2) {
            navigate("/note/quiz/TF", {
              state: {
                quiz: response.data.quizData,
                quizType: "note-TF",
                summaryId: location.state.summaryId,
              },
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="settings">
      <Header />
      <div className="settings__container">
        <div className="settings__wrapper">
          <div className="settings__top">
            <img
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            ></img>
          </div>
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
            options={["Korean", "English"]}
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
      {loading && <Loading message="문제를 생성하는 중입니다..." />}
    </div>
  );
}
