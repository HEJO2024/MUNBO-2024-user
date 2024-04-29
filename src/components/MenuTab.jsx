import "../styles/components/MenuTab.css";

import { useEffect, useState } from "react";

import Alert from "./Alert";
import CloseIcon from "../assets/icon/icon_close.svg";
import LoginIcon from "../assets/icon/icon_login.svg";
import LogoutIcon from "../assets/icon/icon_logout.svg";
import MypageIcon from "../assets/icon/icon_mypage.svg";
import NoteIcon from "../assets/icon/NoteIcon";
import PropTypes from "prop-types";
import QuizIcon from "../assets/icon/QuizIcon";
import { useNavigate } from "react-router-dom";

export default function MenuTab({ setTabOpen, token, setToken }) {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  });

  const closeTab = () => {
    setAnimationClass("slide-out-right");
    setTimeout(() => {
      setTabOpen(false);
    }, 2000);
  };

  const handleLogout = () => {
    setShowAlert({
      message: "로그아웃하시겠습니까?",
      type: "",
      okHandler: () => {
        sessionStorage.removeItem("token");
        navigate("/");
      },
      cancelHandler: () => setShowAlert({ message: "" }),
    });
  };

  return (
    <>
      <div className={`menutab slide-in-right ${animationClass}`}>
        <div className="menutab__wrapper">
          <div className="menutab__top">
            <img
              src={CloseIcon}
              alt="닫기"
              style={{ width: "20px", height: "19.2px", cursor: "pointer" }}
              onClick={closeTab}
            ></img>
          </div>
          <div className="menutab__middle">
            <div
              className="menutab__menu-container"
              onClick={() => navigate("/mypage")}
              // onClick={
              //   sessionStorage.getItem("token")
              //     ? () => navigate("/mypage")
              //     : () => navigate("/login")
              // }
            >
              <img
                src={MypageIcon}
                alt="마이페이지"
                style={{ width: "36px", height: "34.21px" }}
              ></img>
              <span>마이페이지</span>
            </div>
            <div
              className="menutab__menu-container"
              onClick={
                sessionStorage.getItem("token")
                  ? () => navigate("/quiz")
                  : () => navigate("/login")
              }
            >
              <QuizIcon color="rgba(0, 0, 0, 0.7)" />
              <span>문제</span>
            </div>
            <div
              className="menutab__menu-container"
              onClick={
                sessionStorage.getItem("token")
                  ? () => navigate("/note")
                  : () => navigate("/login")
              }
            >
              <NoteIcon color="rgba(0, 0, 0, 0.7)" />
              <span style={{ paddingLeft: "0.55rem" }}>요약노트</span>
            </div>
          </div>
          <hr />
          <div className="menutab__end">
            {token ? (
              <div className="menutab__menu-container" onClick={handleLogout}>
                <img
                  src={LogoutIcon}
                  alt="로그아웃"
                  style={{
                    width: "32px",
                    height: "30.41px",
                    marginRight: "0.8rem",
                    marginLeft: "0.2rem",
                  }}
                ></img>
                <span>로그아웃</span>
              </div>
            ) : (
              <div
                className="menutab__menu-container"
                onClick={() => navigate("/login")}
              >
                <img
                  src={LoginIcon}
                  alt="로그인"
                  style={{
                    width: "40px",
                    height: "38.01px",
                    marginRight: "1.1rem",
                  }}
                ></img>
                <span>로그인</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showAlert.message && (
        <Alert
          message={showAlert.message}
          type={showAlert.type}
          okHandler={showAlert.okHandler}
          cancelHandler={showAlert.cancelHandler}
        />
      )}
    </>
  );
}

MenuTab.propTypes = {
  setTabOpen: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
