import "../../styles/pages/MyPage/Update.css";

import { useEffect, useState } from "react";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    passwd: "",
    name: "",
    email: "",
  });
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    axios
      .get("/api/users/update", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUserInfo({
            id: response.data.userInfo.userId,
            passwd: response.data.userInfo.passwd,
            name: response.data.userInfo.userName,
            email: response.data.userInfo.userEmail,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const passwordChange = (event) => {
    const newPassword = event.target.value;
    setUserInfo({ passwd: newPassword });
    setPasswordValid(validatePassword(newPassword));
  };

  const password2Change = (event) => {
    const confirmPassword = event.target.value === userInfo.passwd;
    setConfirmPassword(confirmPassword);
  };

  const validatePassword = (passwd) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(passwd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userInfo.passwd && userInfo.name && passwordValid && confirmPassword) {
      axios
        .put(
          "/api/users/update",
          {
            passwd: userInfo.passwd,
            userName: userInfo.name,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            sessionStorage.setItem("userName", userInfo.name);
            setShowAlert({
              message: "수정되었습니다!",
              type: "ok",
              okHandler: () => navigate("/mypage"),
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowAlert({
        message: "모든 항목에 올바르게 기입해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
    }
  };

  return (
    <div className="update">
      <Header />
      <div className="update__container">
        <div className="update__wrapper">
          <span className="update__text">회원정보 수정</span>
          <form className="update__form" onSubmit={handleSubmit}>
            <div className="update__form__container">
              <div className="update__form__text">
                <label>아이디</label>
              </div>
              <div className="update__form__input">
                <input value={userInfo.id} readOnly></input>
              </div>
            </div>
            <div className="update__form__container">
              <div className="update__form__text">
                <label>비밀번호</label>
                <p
                  className="update__form__message"
                  style={{
                    color:
                      passwordValid === true
                        ? "#0c0"
                        : passwordValid === false
                        ? "#d62121"
                        : "transparent",
                  }}
                >
                  {passwordValid === true
                    ? "사용 가능한 비밀번호입니다!"
                    : passwordValid === false
                    ? "영문 대소문자, 숫자, 특수문자 포함 8자 이상"
                    : ""}
                </p>
              </div>
              <input
                type="password"
                name="password"
                value={userInfo.passwd}
                onChange={passwordChange}
              ></input>
            </div>
            <div className="update__form__container">
              <div className="update__form__text">
                <label>비밀번호 확인</label>
                <p
                  className="update__form__message"
                  style={{
                    color:
                      confirmPassword === true
                        ? "#0c0"
                        : confirmPassword === false
                        ? "#d62121"
                        : "transparent",
                  }}
                >
                  {confirmPassword === true
                    ? "비밀번호가 일치합니다!"
                    : confirmPassword === false
                    ? "비밀번호가 일치하지 않습니다."
                    : ""}
                </p>
              </div>
              <input type="password" onChange={password2Change}></input>
            </div>
            <div className="update__form__container">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              ></input>
            </div>
            <div
              className="update__form__container"
              style={{ marginBottom: "3.5rem" }}
            >
              <div className="update__form__text">
                <label>이메일</label>
              </div>
              <div className="update__form__input">
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  readOnly
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="update__btn--done"
              onClick={handleSubmit}
            >
              수정하기
            </button>
          </form>
        </div>
      </div>
      <MenuBar />
      {showAlert.message && (
        <Alert
          message={showAlert.message}
          type={showAlert.type}
          okHandler={showAlert.okHandler}
        />
      )}
    </div>
  );
}
