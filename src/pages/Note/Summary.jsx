import "../../styles/pages/Note/Summary.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import BackIcon from "../../assets/icon/icon_back.svg";
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
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/api/summaryNote/note/create",
        {
          summaryId: location.state.summaryId,
          summaryTitle: location.state.title,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
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
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleCreate = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/api/summaryNote/note/create",
        {
          summaryId: location.state.summaryId,
          summaryTitle: location.state.title,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/note/quiz/settings", {
            state: { summaryId: location.state.summaryId },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="summary">
      <Header />
      <div className="summary__container">
        <div className="summary__wrapper">
          <div className="summary__top">
            <img
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            ></img>
          </div>
          <p className="summary__title">{location.state.title}</p>
          <div
            className="summary__content"
            dangerouslySetInnerHTML={location.state.summaryContent}
          />
          <div className="summary__btn">
            <button className="summary__btn--save" onClick={handleSave}>
              저장
            </button>
            <button className="summary__btn--quiz" onClick={handleCreate}>
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
