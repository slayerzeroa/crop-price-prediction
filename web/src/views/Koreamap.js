import React from "react";
import { ReactComponent as SouthKorea } from "@svg-maps/south-korea/south-korea.svg";
import "../components/Navbars/Koreamap.css";
import 배추2개 from "../assets/img/images/배추2개.png";
import { Tooltip } from "react-tooltip";

function Koreamap() {
  return (
    <div>
      <hr />
      <div className="predict-title">
        <h1 className="prediction-text">배추 생산량 예측</h1>
      </div>
      <div className="predict-wrapper">
        <img src={배추2개} alt="배추" className="predict-img" />
        <div className="predict-text">
          <p>
            <span className="bold-black">거래 물량</span>{" "}
            <span className="bold-green">475.8 톤</span> <br />
            <span className="bold-black">거래 금액</span>{" "}
            <span className="bold-green">7.2 억원</span> <br />
            <br />
            전라남도 해남군은 전년 생산량 대비{" "}
            <span className="bold-red">10% 증가한 517.4 톤</span>의 배추 작물
            생산이 예상됩니다. <br />
            전라남도 해남군은 전달 생산량 대비{" "}
            <span className="bold-blue">720% 감소한 400.4 톤</span> 배추 작물
            생산이 예상됩니다.
          </p>
        </div>
      </div>

      <h4>생산량 예측 정보 꺾은선 그래프</h4>
      <div className="predict-info-title">
        {" "}
        우리나라 지역별 배추 생산량 지도{" "}
      </div>
      <div className="map-wrapper">
        <div className="map-container">
          <br />
          <SouthKorea className="map-svg" />
        </div>
      </div>
    </div>
  );
}

export default Koreamap;
