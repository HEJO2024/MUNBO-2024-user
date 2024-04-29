import "../../styles/pages/Note/NoteUpdate.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function NoteUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const noteData = location.state.noteData;
  const [title, setTitle] = useState(noteData.summaryTitle);
  const [content, setContent] = useState(noteData.summaryContent);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  const handleUpdate = () => {
    axios
      .post("", {
        summaryId: noteData.summaryId,
        summaryTitle: title,
        summaryText: content,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "수정되었습니다!",
            type: "ok",
            okHandler: () => navigate(`note/detail/${noteData.summaryId}`),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="note-update">
      <Header />
      <div className="note-update__container">
        <div className="note-update__wrapper">
          <p className="note-update__title">제목</p>
          <input
            type="text"
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p className="note-update__content">내용</p>
          <textarea
            value={content}
            placeholder="내용을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="note-update__btn">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>
            <button onClick={handleUpdate}>수정</button>
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
