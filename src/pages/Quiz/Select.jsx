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

  const handleBtn = () => {
    if (!certificate) {
      setShowAlert({
        message: "자격증을 선택해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
    } else {
      const token = sessionStorage.getItem("token");
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
        })
        .catch((error) => console.log(error));
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
