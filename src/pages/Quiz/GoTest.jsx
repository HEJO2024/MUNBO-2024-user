import "../../styles/pages/Quiz/GoTest.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GoTest() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  const handleBtn = async () => {
    try {
      const response = await axios.get("");
      setQuiz(response.data);
      navigate("/quiz/test", { state: { quiz: quiz } });
    } catch (error) {
      console.error(error);
    }
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
