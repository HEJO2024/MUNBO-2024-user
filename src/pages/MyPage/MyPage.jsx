import "../../styles/pages/MyPage/MyPage.css";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Profile from "../../assets/profile.svg";
import UpdateIcon from "../../assets/icon/icon_update.svg";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="mypage">
      <Header />
      <div className="mypage__container">
        <div className="mypage__wrapper">
          <div className="mypage__profile">
            <img src={Profile} alt="프로필 사진"></img>
            <span>
              <b>홍길동</b> 님
            </span>
          </div>
          <button
            className="mypage__update"
            onClick={() => navigate("/mypage/update")}
          >
            <img src={UpdateIcon} alt="프로필 사진"></img>
            <span>회원정보 수정</span>
          </button>
          <button className="mypage__resign">탈퇴하기</button>
        </div>
      </div>
      <MenuBar />
    </div>
  );
}
