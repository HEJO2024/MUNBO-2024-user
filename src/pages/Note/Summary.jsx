import "../../styles/pages/Note/Summary.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  const handleSave = () => {
    axios
      .post("", {
        summaryId: location.state.summaryId,
        summaryTitle: location.state.summaryTitle,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "저장되었습니다!",
            type: "ok",
            okHandler: () => setShowAlert({ message: "" }),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <button className="summary__btn--save" onClick={handleSave}>
              저장
            </button>
            <button
              className="summary__btn--quiz"
              onClick={() => {
                navigate("/note/quiz/settings", {
                  // state: { summaryId: location.state.summaryId },
                });
              }}
            >
              문제 생성
            </button>
          </div>
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
