import "../../styles/pages/Note/Create.css";

import AttachIcon from "../../assets/icon/icon_attach.svg";
import CameraIcon from "../../assets/icon/icon_camera.svg";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummary = () => {
    setLoading(true);
    axios
      .post("/api/summaryNote/create", { text: content })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/note/summary", {
            state: {
              title: title,
              summaryId: response.data.summaryId,
              summaryContent: {
                __html: response.data.summaryText.replace(/\n/g, "<br>"),
              },
            },
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="create">
      <Header />
      <div className="create__container">
        <div className="create__wrapper">
          <p className="create__title">제목</p>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p className="create__data">자료</p>
          <div className="create__data-container">
            <textarea
              placeholder="공부한 자료를 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="create__icon">
              <img
                src={CameraIcon}
                alt="카메라"
                style={{ cursor: "pointer" }}
              ></img>
              <img
                src={AttachIcon}
                alt="파일첨부"
                style={{ cursor: "pointer" }}
              ></img>
            </div>
          </div>
          <div className="create__btn">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              목록
            </button>
            <button className="create__btn--summary" onClick={handleSummary}>
              요약하기
            </button>
          </div>
        </div>
      </div>
      <MenuBar icon="note" />
      {loading && <Loading message="요약하는 중입니다..." />}
    </div>
  );
}
