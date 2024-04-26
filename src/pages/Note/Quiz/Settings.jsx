import "../../../styles/pages/Note/Quiz/Settings.css";

import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import MenuBar from "../../../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [quizNum, setSelected] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="settings">
      <Header />
      <div className="settings__container">
        <div className="settings__wrapper">
          <p className="select__text">문제 수</p>
          <button className="select__label" onClick={() => setIsOpen(!isOpen)}>
            {quizNum}
          </button>
          {isOpen && <Dropdown handleOptionClick={handleOptionClick} />}
          <button
            className="select__btn"
            onClick={() => navigate("/quiz/test")}
          >
            선택 완료
          </button>
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
