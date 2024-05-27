// Trend.js
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../components/Navbars/Trend.css";

class Trend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: {
        labels: ["쌀", "수박", "참외", "사과", "바나나"],
        datasets: [
          {
            label: "선택기간(24년)",
            data: [200.6, 150, 120, 100, 80], // 모든 품목의 데이터 설정
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "전년동기(23년)",
            data: [180, 140, 110, 90, 70], // 모든 품목의 데이터 설정
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="container">
        <div className="rounded-box">
          <h1 className="prediction-text">한눈에 보는 소비트렌드 TOP 5</h1>
          <div className="bar-chart">
            <Bar
              data={this.state.graphData}
              options={{
                maintainAspectRatio: false,
                indexAxis: "y",
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                          return value + "억원";
                        },
                      },
                    },
                  ],
                },
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
          <div
            className="text-black"
            style={{ marginTop: "20px", textAlign: "left" }}
          >
            <div className="small-text">(단위 : 억원)</div>
            <div className="middle-text">5월 1주차~ 5월 2주차</div>
            <div className="divider"></div>
            <div className="ranking-item">
              <div className="rank">1위</div>
              <div className="item">쌀 200.6억원</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trend;
