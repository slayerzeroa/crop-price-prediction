import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../components/Navbars/Wordcloud.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "", // 검색어 상태값 추가
      graphData: {
        labels: ["배추", "무", "상추", "양파", "마늘"], // 품목별 검색량 제목
        datasets: [
          {
            label: "검색량",
            data: [200, 150, 180, 220, 190], // 품목별 검색량 데이터
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      },
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchKeyword: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="rounded-box">
          <h1 className="prediction-text">언론 기사 품목별 언급량</h1>
          {/* 언론기사 품목별 검색량 막대그래프 */}
          <div className="bar-chart">
            <Bar
              data={this.state.graphData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
