import "../../styles/pages/Note/Detail.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";

export default function Detail() {
  const navigate = useNavigate();
  const noteId = useParams();
  const [noteData, setNoteData] = useState([]);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  useEffect(() => {
    fetchNoteDetail();
  });

  const fetchNoteDetail = () => {
    axios
      .post("", { noteId: noteId })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setNoteData(response.data.summaryData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteBtn = () => {
    setShowAlert({
      message: "삭제하시겠습니까?",
      type: "",
      okHandler: () => deleteNote,
      cancelHandler: () => setShowAlert({ message: "" }),
    });
  };

  const deleteNote = () => {
    axios.post("", { noteId: noteId }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setShowAlert({
          message: "삭제되었습니다!",
          type: "ok",
          okHandler: () => navigate("/note"),
        });
      }
    });
  };

  return (
    <div className="detail">
      <Header />
      <div className="detail__container">
        <div className="detail__wrapper">
          <p className="detail__title">클래스</p>
          <p className="detail__date">작성일: 2024.01.08</p>
          <div className="detail__content">
            객체지향 프로그래밍에서 데이터와 해당 데이터를 처리하는 메소드를
            함께 묶어놓은 추상화된 틀
          </div>
          <div className="detail__btn">
            <div className="detail__btn-container1">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                목록
              </button>
              <button
                onClick={() => {
                  navigate("/note/update", {
                    state: { noteData: noteData },
                  });
                }}
              >
                수정
              </button>
              <button className="detail__btn--delete" onClick={handleDeleteBtn}>
                삭제
              </button>
            </div>
            <div className="detail__btn-container2">
              <button className="detail__btn--save">저장된 문제</button>
            </div>
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
