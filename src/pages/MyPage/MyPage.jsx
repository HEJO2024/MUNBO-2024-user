import "../../styles/pages/MyPage/MyPage.css";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Profile from "../../assets/profile.svg";
import UpdateIcon from "../../assets/icon/icon_update.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MyPage() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  const resignHandler = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete("/api/users/delete", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("token");
          setShowAlert({
            message: "탈퇴되었습니다!",
            type: "ok",
            okHandler: () => navigate("/"),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mypage">
      <Header />
      <div className="mypage__container">
        <div className="mypage__wrapper">
          <div className="mypage__profile">
            <img src={Profile} alt="프로필 사진"></img>
            <span>
              <b>{sessionStorage.getItem("userName")}</b> 님
            </span>
          </div>
          <button
            className="mypage__update"
            onClick={() => navigate("/mypage/update")}
          >
            <img src={UpdateIcon} alt="프로필 사진"></img>
            <span>회원정보 수정</span>
          </button>
          <button
            className="mypage__resign"
            onClick={() =>
              setShowAlert({
                message: "탈퇴하시겠습니까?",
                type: "",
                okHandler: resignHandler,
                cancelHandler: () => setShowAlert({ message: "" }),
              })
            }
          >
            탈퇴하기
          </button>
        </div>
      </div>
      <MenuBar />
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
