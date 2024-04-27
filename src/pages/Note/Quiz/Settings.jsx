import "../../../styles/pages/Note/Quiz/Settings.css";

import Alert from "../../../components/Alert";
import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import MenuBar from "../../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [num, setNum] = useState(0);
  const [type, setType] = useState("");
  const [lang, setLang] = useState("");
  const [etc, setEtc] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEtcChange = (e) => {
    setEtc(e.target.value);
  };
  const handleSubmit = () => {
    if (!num || !type || !lang || !etc) {
      setShowAlert(true);
      return;
    }

    axios
      .post("", {
        num: num,
        type: type,
        lang: lang,
        etc: etc,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // 문제 유형에 따라 다른 페이지로.
          navigate("/note/quiz");
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
    </div>
  );
}
