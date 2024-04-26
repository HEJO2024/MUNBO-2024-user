import "../../styles/pages/Quiz/Select.css";

import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();

  return (
    <div className="select">
      <Header />
      <div className="select__container">
        <div className="select__wrapper">
          <Dropdown
            message="자격증을 선택해주세요."
            options={["정보처리기사"]}
            defaultOption="선택"
          />
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
