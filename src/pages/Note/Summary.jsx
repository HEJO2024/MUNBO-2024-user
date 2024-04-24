import "../../styles/pages/Note/Summary.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();

  return (
    <div className="summary">
      <Header />
      <div className="summary__container">
        <div className="summary__wrapper">
          <p className="summary__title">클래스</p>
          <div className="summary__content">
            객체지향 프로그래밍에서 데이터와 해당 데이터를 처리하는 메소드를
            함께 묶어놓은 추상화된 틀
          </div>
          <div className="summary__btn">
            <button className="summary__btn--save">저장</button>
            <button
              className="summary__btn--quiz"
              onClick={() => {
                navigate("");
              }}
            >
              문제 생성
            </button>
          </div>
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
