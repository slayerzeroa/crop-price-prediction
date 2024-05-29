import React from "react";
import { useState, useEffect } from "react";

import 배추2개 from "../assets/img/images/배추2개.png";
import 기준가격 from "../assets/img/images/기준가격.png";
import 수급조절 from "../assets/img/images/수급조절.png";
import "../components/Navbars/Predict.css";
import Chartcard from "../views/Chartcard";

import "./Predict.css"; // CSS 파일 임포트

// predLevel 함수 정의
function predLevel(predReturns) {
  if (predReturns > 40) {
    return { label: "심각 단계", className: "text-red" };
  } else if (predReturns > 25) {
    return { label: "경계 단계", className: "text-orange" };
  } else if (predReturns > 10) {
    return { label: "주의 단계", className: "text-yellow" };
  } else if (predReturns >= -10) {
    return { label: "안정 단계", className: "text-green" };
  } else if (predReturns > -25) {
    return { label: "주의 단계", className: "text-yellow" };
  } else if (predReturns > -35) {
    return { label: "경계 단계", className: "text-orange" };
  } else if (predReturns < -45) {
    return { label: "심각 단계", className: "text-red" };
  }
}
function Predict() {
  const [nowData, setNowData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price Data",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  useEffect(() => {
    fetch("http://ajoufe.iptime.org:5556/recent")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.ymd);
        const dataPoints = data.map((item) => item.price);
        setNowData({
          labels: labels,
          datasets: [
            {
              ...nowData.datasets[0],
              data: dataPoints,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [predData, setPredData] = useState({
    labels: [],
    datasets: [
      {
        label: "Prediction Data",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    fetch("http://ajoufe.iptime.org:5556/pred")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.ymd);
        const dataPoints = data.map((item) => item.pred);
        setPredData({
          labels: labels,
          datasets: [
            {
              ...predData.datasets[0],
              data: dataPoints,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const predReturns = (
    ((predData.datasets[0].data[0] - nowData.datasets[0].data[0]) /
      nowData.datasets[0].data[0]) *
    100
  ).toFixed(2);

  const levelInfo = predLevel(predReturns) || {
    label: "데이터 처리 중",
    className: "text-gray",
  }; // Provide a fallback for levelInfo

  return (
    <div className="predict-title">
      <br />
      <h1 className="prediction-text">배추 가격 예측</h1>

      <div className="predict-wrapper">
        <img src={배추2개} alt="배추" className="predict-img" />
        <div className="predict-text">
          <h4>다음달 예상 가격</h4>
          <br />
          <p>
            배추는 다음달 가격 {predData.datasets[0].data[0]}원으로 예상 됩니다.
          </p>
          <p>
            ({nowData.labels[0]})기준 가격 {nowData.datasets[0].data[0]}원 대비{" "}
            <span className={levelInfo.className}>{predReturns}%</span>
            입니다.
          </p>
          <p>
            농산물 수급조절 매뉴얼 기준{" "}
            <span className={levelInfo.className}>{levelInfo.label}</span>
            입니다.
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
