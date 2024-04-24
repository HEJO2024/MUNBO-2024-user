import "../../styles/pages/MyPage/Update.css";

import { useEffect, useState } from "react";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("");
      setUserInfo({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const passwordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const password2Change = (event) => {
    const confirmPassword = event.target.value === password;
    setConfirmPassword(confirmPassword);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordValid && confirmPassword && userInfo.name && userInfo.email) {
      try {
        const response = await axios.post("", {
          password: password,
          name: userInfo.name,
          email: userInfo.email,
        });

        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("모든 항목을 올바르게 입력해주세요.");
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
                value={password}
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
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <button type="submit" className="update__btn--done">
              수정하기
            </button>
          </form>
        </div>
      </div>
      <MenuBar />
    </div>
  );
}
