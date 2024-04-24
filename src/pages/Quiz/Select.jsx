import "../../styles/pages/Quiz/Select.css";

import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Select() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("선택");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="select">
      <Header />
      <div className="select__container">
        <div className="select__wrapper">
          <p className="select__text">자격증을 선택해주세요.</p>
          <button className="select__label" onClick={() => setIsOpen(!isOpen)}>
            {selected}
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
      <MenuBar icon="quiz" />
    </div>
  );
}
