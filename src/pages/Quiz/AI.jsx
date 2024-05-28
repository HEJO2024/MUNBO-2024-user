import "../../styles/pages/Quiz/AI.css";

import { useLocation, useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import Ans from "../../components/button/Ans";
import BackIcon from "../../assets/icon/icon_back.svg";
import Empty from "../../components/Empty";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MenuBar from "../../components/MenuBar";
import Original from "../../components/Original";
import SaveIcon from "../../assets/icon/icon_save.svg";
import Solve from "../../components/Solve";
import ThumbIcon1 from "../../assets/icon/icon_thumb-down.svg";
import ThumbIcon2 from "../../assets/icon/icon_thumb-down-selected.svg";
import axios from "axios";
import { useState } from "react";

export default function AI() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [quizIndex, setQuizIndex] = useState(0);
  // const [quizzes, setQuizzes] = useState(location.state.quiz);
  const [quiz, setQuiz] = useState(location.state.quiz);
  const [veiwSolve, setVeiwSolve] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#006D77");
  const [checkAns, setCheckAns] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    okHandler: null,
    cancelHandler: null,
  });
  const [viewOrg, setViewOrg] = useState(false);
  const [orgData, setOrgData] = useState({});
  const [quizExist, setQuizExist] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);

  const handleSelection = (option) => {
    if (!checkAns) {
      setSelected(option);
    }
  };

  const handleResult = (color) => {
    setSelectedColor(color);
  };

  const handleSaveBtn = () => {
    setShowAlert({
      message: "문제를 저장할까요?",
      type: "",
      okHandler: handleSave,
      cancelHandler: () =>
        setShowAlert({
          message: "",
        }),
    });
  };

  const handleSave = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/api/quiz/note/ai_save",
        { quizId: quiz.quizId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert({
            message: "저장되었습니다!",
            type: "ok",
            okHandler: () => setShowAlert({ message: "" }),
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setQuizExist(false);
        }
      });
  };

  const orgQuiz = () => {
    setViewOrg(true);
    axios
      .get("/api/quiz/ai_original", { params: { quizId: quiz.org_quizId } })
      .then((response) => {
        // console.log(response.data.quizData);
        if (response.status === 200) {
          setViewOrg(true);
          setOrgData(response.data.quizData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={`AI ${veiwSolve && "AI-hidden-scroll"}`}>
        <Header />
        <div className="AI__container">
          <div className="AI__wrapper">
            {!quizExist && (
              <div className="AI__back">
                <img
                  src={BackIcon}
                  alt="뒤로가기"
                  onClick={() => navigate(-1)}
                ></img>
              </div>
            )}
            {!quizExist ? (
              <Empty message="추천 문제가 없어요." />
            ) : (
              <>
                <div
                  className="AI__top"
                  // style={{
                  //   justifyContent:
                  //     location.state.quizType === "saved-ai" ? "end" : "",
                  // }}
                >
                  <button onClick={orgQuiz}>내가 틀린 문제</button>
                  <div className="AI__icon">
                    {!dislike ? (
                      <img
                        src={ThumbIcon1}
                        alt="비추천"
                        onClick={() => setDislike(true)}
                      ></img>
                    ) : (
                      <img
                        src={ThumbIcon2}
                        alt="비추천"
                        onClick={() => setDislike(false)}
                      ></img>
                    )}
                    <img
                      src={SaveIcon}
                      alt="저장"
                      style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                      onClick={handleSaveBtn}
                    ></img>
                  </div>
                </div>
                <p className="AI__info">AI가 만든 문제</p>
                <p className="AI__question">{quiz.quizContent}</p>
                <div
                  className="AI__choice"
                  onClick={() => handleSelection("A")}
                  style={{
                    color: selected === "A" ? selectedColor : "",
                    fontWeight: selected === "A" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  A.&nbsp; {quiz.answ.answ_1}
                </div>
                <div
                  className="AI__choice"
                  onClick={() => handleSelection("B")}
                  style={{
                    color: selected === "B" ? selectedColor : "",
                    fontWeight: selected === "B" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  B.&nbsp; {quiz.answ.answ_2}
                </div>
                <div
                  className="AI__choice"
                  onClick={() => handleSelection("C")}
                  style={{
                    color: selected === "C" ? selectedColor : "",
                    fontWeight: selected === "C" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  C.&nbsp;{quiz.answ.answ_3}
                </div>
                <div
                  className="AI__choice"
                  onClick={() => handleSelection("D")}
                  style={{
                    marginBottom: "4rem",
                    color: selected === "D" ? selectedColor : "",
                    fontWeight: selected === "D" ? "600" : "",
                    pointerEvents: checkAns ? "none" : "auto",
                  }}
                >
                  D.&nbsp; {quiz.answ.answ_4}
                </div>
                <Ans
                  quizType={location.state.quizType}
                  setVeiwSolve={setVeiwSolve}
                  setQuiz={setQuiz}
                  selected={selected}
                  setSelected={setSelected}
                  answer={quiz.r_answ}
                  handleResult={handleResult}
                  checkAns={checkAns}
                  setCheckAns={setCheckAns}
                  dislike={dislike}
                  setDislike={setDislike}
                  last={quiz.lastQuiz}
                  quizId={quiz.quizId}
                  setShowAlert={setShowAlert}
                  setLoading={setLoading}
                  totalNum={totalNum}
                  correctNum={correctNum}
                  setTotalNum={setTotalNum}
                  setCorrectNum={setCorrectNum}
                />
              </>
            )}
          </div>
        </div>
        <MenuBar icon="quiz" />
        {showAlert.message && (
          <Alert
            message={showAlert.message}
            type={showAlert.type}
            okHandler={showAlert.okHandler}
            cancelHandler={showAlert.cancelHandler}
          />
        )}
        {viewOrg && <Original setViewOrg={setViewOrg} orgData={orgData} />}
        {loading && (
          <Loading
            message={`${sessionStorage.getItem(
              "userName"
            )}님이 틀린 문제를 기반으로 문제를 생성하고 있어요 😃`}
          />
        )}
      </div>
      {veiwSolve && (
        <Solve
          setViewSolve={setVeiwSolve}
          answer={quiz.r_answ}
          solve={quiz.wrgAnsw_explanation}
        />
      )}
    </>
  );
}
