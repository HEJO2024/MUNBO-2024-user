import "../styles/components/Header.css";

import { useEffect, useState } from "react";

import HamburgerIcon from "../assets/icon/icon_hamburger.svg";
import Logo from "../assets/logo.svg";
import MenuTab from "./MenuTab";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [tabOpen, setTabOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  });

  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <div className="header__start" onClick={() => navigate("/")}>
            <img className="header__logo" src={Logo} alt="Logo" />
            <span className="header__munbo">문보</span>
          </div>
          <div className="header__end">
            {!token ? (
              <span
                className="header__login"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            ) : (
              <span className="header__user">
                <b>{sessionStorage.getItem("userName")}</b> 님
              </span>
            )}
            <img
              className="header__hamburger"
              src={HamburgerIcon}
              onClick={() => setTabOpen(true)}
              style={{ cursor: "pointer" }}
            ></img>
          </div>
        </div>
      </div>
      {tabOpen && (
        <MenuTab setTabOpen={setTabOpen} token={token} setToken={setToken} />
      )}
    </>
  );
}
