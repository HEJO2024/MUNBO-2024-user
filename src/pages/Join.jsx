import "../styles/pages/Join.css";

import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Join() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idValid, setIdValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const idChange = (event) => {
    setId(event.target.value);
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
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.post("/api/users/checkDuplicate_id", {
        userId: id,
      });
      if (response.status === 200) {
        setIdValid(true);
      } else {
        setIdValid(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (idValid && passwordValid && confirmPassword && name && email) {
      try {
        const response = await axios.post("api/users/join", {
          userId: id,
          passwd: password,
          userName: name,
          userEmail: email,
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
    <div className="join">
      <Header />
      <div className="join__container">
        <div className="join__wrapper">
          <span className="join__text">회원가입</span>
          <form className="join__form">
            <div className="join__form__container">
              <div className="join__form__text">
                <label>아이디</label>
                <p
                  className="join__form__message"
                  style={{
                    color:
                      idValid === true
                        ? "#0c0"
                        : idValid === false
                        ? "#d62121"
                        : "transparent",
                  }}
                >
                  {idValid === true
                    ? "사용 가능한 아이디입니다!"
                    : idValid === false
                    ? "중복된 아이디입니다."
                    : ""}
                </p>
              </div>
              <div className="join__form__input">
                <input
                  type="text"
                  name="id"
                  value={id}
                  onChange={idChange}
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderRight: "none",
                  }}
                ></input>
                <button
                  className="join__btn--check"
                  style={{ width: "38%" }}
                  onClick={handleIdCheck}
                >
                  중복확인
                </button>
              </div>
            </div>
            <div className="join__form__container">
              <div className="join__form__text">
                <label>비밀번호</label>
                <p
                  className="join__form__message"
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
            <div className="join__form__container">
              <div className="join__form__text">
                <label>비밀번호 확인</label>
                <p
                  className="join__form__message"
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
            <div className="join__form__container">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={nameChange}
              ></input>
            </div>
            <div
              className="join__form__container"
              style={{ marginBottom: "3.5rem" }}
            >
              <div className="join__form__text">
                <label>이메일</label>
              </div>
              <div className="join__form__input">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={emailChange}
                  // style={{
                  //   borderTopRightRadius: "0",
                  //   borderBottomRightRadius: "0",
                  //   borderRight: "none",
                  // }}
                ></input>
                {/* <button className="join__btn--check">인증</button> */}
              </div>
            </div>
            {/* <div
              className="join__form__container"
              style={{ marginBottom: "3.5rem" }}
            >
              <div className="join__form__text">
                <label>인증번호</label>
                <p className="join__form__message">인증되었습니다!</p>
              </div>
              <div className="join__form__input">
                <input
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderRight: "none",
                    marginBottom: "0.9rem",
                  }}
                ></input>
                <button className="join__btn--check">확인</button>
              </div>
              <span className="join__form__time">02:00</span>
            </div> */}
            <button
              type="submit"
              className="join__btn--done"
              onClick={handleSubmit}
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
      <MenuBar icon="" />
    </div>
  );
}
