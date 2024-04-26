import "../../../styles/pages/Note/Quiz/Settings.css";

import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import MenuBar from "../../../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings">
      <Header />
      <div className="settings__container">
        <div className="settings__wrapper">
          <Dropdown
            message="문제 수"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultOption="문제 수를 선택해주세요."
          />
          <Dropdown
            message="문제 유형"
            options={["객관식(4지선다)", "주관식", "OX 퀴즈"]}
            defaultOption="문제 유형을 선택해주세요."
          />
          <Dropdown
            message="언어"
            options={["한국어", "영어"]}
            defaultOption="언어를 선택해주세요."
          />
          <button
            className="settings__btn"
            onClick={() => navigate("/note/quiz")}
          >
            문제 생성
          </button>
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
