import "../../styles/pages/Quiz/GoTest.css";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useState } from "react";

export default function GoTest() {
  const navigate = useNavigate();
  const location = useLocation;
  const [quiz, setQuiz] = useState(null);

  const handleBtn = () => {
    navigate("/quiz/test");
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "",
        { certificate: location.state.certificate },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setQuiz(response.data.quiz);
          navigate("/quiz/test", { state: { quiz: quiz } });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="go-test">
      <Header />
      <div className="go-test__container">
        <div className="go-test__wrapper">
          <button className="go-test__btn" onClick={handleBtn}>
            진단평가 받기
          </button>
        </div>
      </div>
      <MenuBar icon="quiz" />
    </div>
  );
}
