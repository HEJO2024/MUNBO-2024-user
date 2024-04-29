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
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      setShowAlert({
        message: "아이디를 입력해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
      return;
    }
    if (!password) {
      setShowAlert({
        message: "비밀번호를 입력해주세요.",
        type: "ok",
        okHandler: () => setShowAlert({ message: "" }),
      });
      return;
    }

    axios
      .post("/api/users/login", {
        userId: id,
        passwd: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setShowAlert({
            message: "아이디 혹은 비밀번호가 일치하지 않습니다.",
            type: "ok",
            okHandler: () =>
              setShowAlert({ message: "", type: "", okHandler: null }),
          });
        } else {
          console.error(error);
        }
      });
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
      <MenuBar icon="" />
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
