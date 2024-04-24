import "../styles/pages/Login.css";

import Alert from "../components/Alert";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id) {
      setShowAlert1(true);
      return;
    }
    if (!password) {
      setShowAlert2(true);
      return;
    }

    try {
      const response = await axios.post("", {
        id: id,
        password: password,
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const confirmAlert1 = () => {
    setShowAlert1(false);
  };

  const confirmAlert2 = () => {
    setShowAlert2(false);
  };

  return (
    <div className="login">
      <Header />
      <div className="login__container">
        <div className="login__wrapper">
          <span className="login__text">로그인</span>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="아이디"
              name="id"
              value={id}
              onChange={handleChange}
            ></input>
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              onChange={handleChange}
            ></input>
            <span>아이디 찾기 &nbsp;|&nbsp; 비밀번호 찾기</span>
            <button type="submit">로그인</button>
            <p>
              아직 회원이 아니신가요?&nbsp;
              <b
                onClick={() => navigate("/join")}
                style={{ cursor: "pointer" }}
              >
                회원가입 하러가기
              </b>
            </p>
          </form>
        </div>
      </div>
      <MenuBar />
      {showAlert1 && (
        <Alert
          message="아이디를 입력해주세요."
          type="ok"
          okHandler={confirmAlert1}
        />
      )}
      {showAlert2 && (
        <Alert
          message="비밀번호를 입력해주세요."
          type="ok"
          okHandler={confirmAlert2}
        />
      )}
    </div>
  );
}
