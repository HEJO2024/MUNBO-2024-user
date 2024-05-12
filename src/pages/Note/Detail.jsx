import "../../styles/pages/Note/Detail.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";

export default function Detail() {
  const navigate = useNavigate();
  const noteId = useParams().noteId;
  const [noteData, setNoteData] = useState([]);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  useEffect(() => {
    fetchNoteDetail();
  }, []);

  const fetchNoteDetail = () => {
    axios
      .get("/api/summaryNote/note/view", {
        params: { noteId: parseInt(noteId) },
      })
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
      okHandler: deleteNote,
      cancelHandler: () => setShowAlert({ message: "" }),
    });
  };

  const savedQuiz = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/api/quiz/note/view", {
        params: { is_summary: 1 },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.quizData[0].quizType === 0) {
            navigate("/note/quiz/MCQ", {
              state: {
                quiz: response.data.quizData,
                quizType: "saved-MCQ",
                noteId: noteId,
              },
            });
          } else if (response.data.quizData[0].quizType === 1) {
            navigate("/note/quiz/essay", {
              state: {
                quiz: response.data.quizData,
                quizType: "saved-Essay",
                noteId: noteId,
              },
            });
          } else if (response.data.quizData[0].quizType === 2) {
            navigate("/note/quiz/TF", {
              state: {
                quiz: response.data.quizData,
                quizType: "saved-TF",
                noteId: noteId,
              },
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const deleteNote = () => {
    axios
      .delete("/api/summaryNote/note/delete", {
        data: { noteId: noteId },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "삭제되었습니다!",
            type: "ok",
            okHandler: () => navigate("/note"),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="detail">
      <Header />
      <div className="detail__container">
        <div className="detail__wrapper">
          <p className="detail__title">{noteData.summaryTitle}</p>
          <p className="detail__date">{noteData.summaryDate}</p>
          <div className="detail__content">{noteData.summaryText}</div>
          <div className="detail__btn">
            <div className="detail__btn-container1">
              <button
                onClick={() => {
                  navigate("/note");
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
              <button className="detail__btn--save" onClick={savedQuiz}>
                저장된 문제
              </button>
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
