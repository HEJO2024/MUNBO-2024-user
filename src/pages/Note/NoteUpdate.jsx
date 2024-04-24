import "../../styles/pages/Note/NoteUpdate.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NoteUpdate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("클래스");
  const [content, setContent] = useState("내용");

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
            <button>수정</button>
          </div>
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
