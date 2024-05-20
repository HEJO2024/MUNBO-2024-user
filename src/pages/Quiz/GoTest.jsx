import "../../styles/pages/Quiz/GoTest.css";

import BackIcon from "../../assets/icon/icon_back.svg";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoTest() {
  const navigate = useNavigate();

  const handleBtn = () => {
    axios
      .get("/api/quiz/test_solve")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/quiz/test", {
            state: {
              quiz: response.data.quizData,
              last: response.data.lastQuiz,
            },
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="go-test">
      <Header />
      <div className="go-test__container">
        <div className="go-test__wrapper">
          <div className="go-test__top">
            <img
              src={BackIcon}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            ></img>
          </div>
          <button className="go-test__btn" onClick={handleBtn}>
            진단평가 받기
          </button>
        </div>
      </div>
      <MenuBar icon="quiz" />
    </div>
  );
}
