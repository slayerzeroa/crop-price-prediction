import React from "react";
import 배추2개 from "../assets/img/images/배추2개.png";
import 기준가격 from "../assets/img/images/기준가격.png";
import 수급조절 from "../assets/img/images/수급조절.png";
import "../components/Navbars/Predict.css";
import Chartcard from "../views/Chartcard";

function Predict() {
  return (
    <div className="predict-title">
      <br />
      <h1 className="prediction-text">배추 가격 예측</h1>

      <div className="predict-wrapper">
        <img src={배추2개} alt="배추" className="predict-img" />
        <div className="predict-text">
          <h4>다음달 예상 가격</h4>
          <br />
          <p>배추는 다음달 가격 1,520원으로 예상 됩니다.</p>
          <p>
            1달 전 대비 <span className="bold-red">10% 증가</span>한 가격
            입니다.
          </p>
          <p>
            농산물 수급조절 매뉴얼 기준{" "}
            <span className="bold-green">주의 단계</span>입니다.
          </p>
        </div>
      </div>

      <h4> 가격 예측 정보 꺾은선 그래프</h4>

      <div className="predict-info-wrapper">
        <div className="predict-info-item">
          <div className="predict-info-title">
            배추 단계별 기준 가격( 단위 : 원/10kg)
          </div>
          <img src={기준가격} alt="기준 가격" className="predict-info-img" />
        </div>
        <div className="predict-info-item">
          <div className="predict-info-title">수급 조절 대응 조치 매뉴얼</div>
          <img src={수급조절} alt="수급 조절" className="predict-info-img" />
        </div>
      </div>
    </div>
  );
}

export default Predict;
