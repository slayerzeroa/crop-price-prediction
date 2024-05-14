import React from "react";
import "./CustomNavbar.css";
import { NavLink } from "react-router-dom";
import Main from "../../pages/Main";
import Service from "../../pages/Service";
import Additional from "../../pages/Additional";
import Forecast from "../../pages/Forecast";
import logoImage from "../../assets/img/images/logo3.png";

function CustomNavbar() {
  return (
    <div className="CustomNavbar">
      <div className="top-bar">
        <nav>
          <ul>
            <li>
              <NavLink to="/main">
                <img src={logoImage} alt="로고 이미지" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/service">서비스 소개</NavLink>
            </li>
            <li>
              <NavLink to="/forecast">생산량 및 가격 예측 서비스</NavLink>
            </li>
            <li>
              <NavLink to="/additional">부가서비스</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomNavbar;
