import "../styles/components/Original.css";

import BackIcon from "../assets/icon/icon_back.svg";
import Header from "./Header";
import MenuBar from "./MenuBar";
import PropTypes from "prop-types";
import Solve from "./Solve";
import StarIcon from "../assets/star.svg";
import { useState } from "react";

export default function Original({ orgData, setViewOrg }) {
  const [selected, setSelected] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [veiwSolve, setVeiwSolve] = useState(false);
  console.log(orgData);

  const handleSelection = (option) => {
    setSelected(option);

    if (option === orgData.r_answ) {
      setSelectedColor("#3A86FF");
    } else {
      setSelectedColor("#C93737");
    }
  };

  const viewSolve = () => {
    setVeiwSolve(true);
  };

  const subjectColors = {
    "소프트웨어 설계": "#FCF5C7",
    "소프트웨어 개발": "#FFEBF0",
    "데이터베이스 구축": "#E9EDC9",
    "프로그래밍언어 활용": "#F0E3FD",
    "정보시스템 구축 관리": "#E1EFF6",
  };

  const subjectColor = subjectColors[orgData.subjectId];

  return (
    <>
      <div className={`original ${veiwSolve && "original-hidden-scroll"}`}>
        <Header />
        <div className="original__container">
          <div className="original__wrapper">
            <div className="original__top">
              <img
                src={BackIcon}
                alt="뒤로가기"
                onClick={() => setViewOrg(false)}
              ></img>
            </div>
            <div
              className="original__subject"
              style={{ backgroundColor: subjectColor }}
            >
              {orgData.subjectId}
            </div>
            <p className="original__info">{orgData.roundId}</p>
            <p className="original__question">{orgData.quizContent}</p>
            <div
              className="original__choice"
              onClick={() => handleSelection(1)}
              style={{
                color: selected === 1 ? selectedColor : "",
                fontWeight: selected === 1 ? "600" : "",
              }}
            >
              ①&nbsp; {orgData.answ_1}
            </div>
            <div
              className="original__choice"
              onClick={() => handleSelection(2)}
              style={{
                color: selected === 2 ? selectedColor : "",
                fontWeight: selected === 2 ? "600" : "",
              }}
            >
              ②&nbsp; {orgData.answ_2}
            </div>
            <div
              className="original__choice"
              onClick={() => handleSelection(3)}
              style={{
                color: selected === 3 ? selectedColor : "",
                fontWeight: selected === 3 ? "600" : "",
              }}
            >
              ③&nbsp; {orgData.answ_3}
            </div>
            <div
              className="original__choice"
              onClick={() => handleSelection(4)}
              style={{
                marginBottom: "4rem",
                color: selected === 4 ? selectedColor : "",
                fontWeight: selected === 4 ? "600" : "",
              }}
            >
              ④&nbsp; {orgData.answ_4}
            </div>
            <div className="original__btn">
              <button className="original__btn--solve" onClick={viewSolve}>
                해설보기
              </button>
            </div>
            <div className="original__keyword">
              <div className="original__keyword-title">
                <img
                  src={StarIcon}
                  alt="중요"
                  style={{ marginRight: "0.3rem" }}
                ></img>
                <span>핵심 키워드</span>
                <img
                  src={StarIcon}
                  alt="중요"
                  style={{ marginLeft: "0.3rem" }}
                ></img>
              </div>
              <span>{orgData.keywordId}</span>
            </div>
          </div>
        </div>
        <MenuBar icon="quiz" />
      </div>
      {veiwSolve && (
        <Solve
          setViewSolve={setVeiwSolve}
          answer={orgData.r_answ}
          solve={orgData.wrgAnsw_explanation}
          subject={orgData.subjectId}
        />
      )}
    </>
  );
}

Original.propTypes = {
  orgData: PropTypes.object.isRequired,
  setViewOrg: PropTypes.func.isRequired,
};
