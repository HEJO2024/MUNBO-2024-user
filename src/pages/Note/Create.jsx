import "../../styles/pages/Note/Create.css";

import AttachIcon from "../../assets/icon/icon_attach.svg";
import CameraIcon from "../../assets/icon/icon_camera.svg";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  return (
    <div className="create">
      <Header />
      <div className="create__container">
        <div className="create__wrapper">
          <p className="create__title">제목</p>
          <input type="text" placeholder="제목을 입력해주세요."></input>
          <p className="create__data">자료</p>
          <div className="create__data-container">
            <textarea placeholder="공부한 자료를 입력해주세요."></textarea>
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
            <button
              className="create__btn--summary"
              onClick={() => {
                navigate("/note/summary");
              }}
            >
              요약하기
            </button>
          </div>
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
