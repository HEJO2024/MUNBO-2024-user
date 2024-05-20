import "../styles/pages/About.css";

import AboutImg1 from "../assets/about1.svg";
import AboutImg2 from "../assets/about2.svg";
import BackIcon from "../assets/icon/icon_back-white.svg";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about">
      <Header />
      <div className="about__container">
        <div className="about__wrapper">
          <div className="about__header">
            <div className="about__back">
              <img
                src={BackIcon}
                alt="뒤로가기"
                onClick={() => navigate("/")}
              ></img>
            </div>
            <p>자격증 대비</p>
            <p>
              학습 도우미 서비스 <b>문보</b>
            </p>
          </div>
          <div className="about__main1">
            <div className="about__main1__text">
              <p>생성형 AI를 이용한</p>
              <p>진단평가 기반 문제 추천</p>
              <p>
                진단평가의 오답문제와 매핑된 키워드를 기반으로 AI 문제가
                만들어집니다.
              </p>
            </div>
            <img src={AboutImg1} alt="about"></img>
          </div>
          <div className="about__main2">
            <div className="about__main2__text">
              <p>공부한 자료로</p>
              <p>나만의 요약노트 만들기!</p>
              <p>
                공부한 자료를 입력해 요약노트를 만들고 문제를 생성해 풀어볼 수
                있어요.
                <br />
                문제는 객관식, 주관식, OX퀴즈 중 선택할 수 있습니다.
              </p>
            </div>
            <img src={AboutImg2} alt="about"></img>
          </div>
        </div>
      </div>
      <MenuBar icon="" />
    </div>
  );
}
