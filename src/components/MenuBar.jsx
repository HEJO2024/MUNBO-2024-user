import "../styles/components/MenuBar.css";

import { useEffect, useState } from "react";

import HomeIcon from "../assets/icon/HomeIcon";
import NoteIcon from "../assets/icon/NoteIcon";
import PropTypes from "prop-types";
import QuizIcon from "../assets/icon/QuizIcon";
import { useNavigate } from "react-router-dom";

export default function MenuBar({ icon }) {
  const navigate = useNavigate();
  const [iconColors, setIconColors] = useState({
    quiz: "#C0C0C0",
    home: "#C0C0C0",
    note: "#C0C0C0",
  });
  const [menuColors, setMenuColors] = useState({
    quiz: "#C0C0C0",
    home: "#C0C0C0",
    note: "#C0C0C0",
  });

  useEffect(() => {
    // icon이 전달되었을 때만 초기 아이콘 색상을 검정색으로 설정
    if (icon) {
      setIconColors({
        quiz: icon === "quiz" ? "#000" : "#C0C0C0",
        home: icon === "home" ? "#000" : "#C0C0C0",
        note: icon === "note" ? "#000" : "#C0C0C0",
      });
      setMenuColors({
        quiz: icon === "quiz" ? "#000" : "#C0C0C0",
        home: icon === "home" ? "#000" : "#C0C0C0",
        note: icon === "note" ? "#000" : "#C0C0C0",
      });
    }
  }, [icon]);

  const handleIconClick = (icon) => {
    setIconColors({
      quiz: icon === "quiz" ? "#000" : "#C0C0C0",
      home: icon === "home" ? "#000" : "#C0C0C0",
      note: icon === "note" ? "#000" : "#C0C0C0",
    });
    setMenuColors({
      quiz: icon === "quiz" ? "#000" : "#C0C0C0",
      home: icon === "home" ? "#000" : "#C0C0C0",
      note: icon === "note" ? "#000" : "#C0C0C0",
    });
    if (icon === "quiz") {
      navigate("/quiz");
    }
    if (icon === "home") {
      navigate("/");
    }
    if (icon === "note") {
      navigate("/note");
    }
    // if (sessionStorage.getItem("token")) {
    //   if (icon === "quiz") {
    //     navigate("/quiz");
    //   }
    //   if (icon === "home") {
    //     navigate("/");
    //   }
    //   if (icon === "note") {
    //     navigate("/note");
    //   }
    // } else {
    //   navigate("/login");
    // }
  };

  return (
    <div className="menubar">
      <div className="menubar__wrapper">
        <div
          className="menubar__container"
          onClick={() => handleIconClick("quiz")}
        >
          <div className="menubar__icon--quiz">
            <QuizIcon color={iconColors.quiz} />
          </div>
          <span style={{ color: menuColors.quiz }}>문제</span>
        </div>
        <div
          className="menubar__container"
          onClick={() => handleIconClick("home")}
        >
          <div className="menubar__icon--home">
            <HomeIcon color={iconColors.home} />
          </div>
          <span style={{ color: menuColors.home }}>홈</span>
        </div>
        <div
          className="menubar__container"
          onClick={() => handleIconClick("note")}
        >
          <div className="menubar__icon--note">
            <NoteIcon color={iconColors.note} />
          </div>
          <span style={{ color: menuColors.note }}>요약노트</span>
        </div>
      </div>
    </div>
  );
}

MenuBar.propTypes = {
  icon: PropTypes.string.isRequired,
};
