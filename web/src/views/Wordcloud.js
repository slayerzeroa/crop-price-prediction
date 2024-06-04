import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import "../components/Navbars/Wordcloud.css";

class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGrade: "상품",
      selectedWeight: "10kg",
      chartData: {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets: [
          {
            label: "평균가격",
            data: [100, 120, 110, 130, 105],
            borderColor: "rgba(75, 192, 192, 0.6)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            type: "line",
            yAxisID: "A",
          },
          {
            label: "거래량",
            data: [50, 60, 55, 65, 52],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            yAxisID: "B",
          },
        ],
      },
      statistics: [
        { month: "1월", avgPrice: 100, volume: 50 },
        { month: "2월", avgPrice: 110, volume: 60 },
        { month: "3월", avgPrice: 105, volume: 55 },
        { month: "4월", avgPrice: 120, volume: 65 },
        { month: "5월", avgPrice: 115, volume: 52 },
      ],
    };
  }

  handleGradeSelect = (event) => {
    this.setState({ selectedGrade: event.target.value });
  };

  handleWeightSelect = (event) => {
    this.setState({ selectedWeight: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="rounded-box">
          <h1 className="prediction-text">배추 도매가격 현황</h1>
          <div className="chart-container">
            <div className="chart-selector">
              <select
                value={this.state.selectedGrade}
                onChange={this.handleGradeSelect}
              >
                <option value="상품">상품</option>
                <option value="중품">중품</option>
              </select>
            </div>
            <div className="chart-selector">
              <select
                value={this.state.selectedWeight}
                onChange={this.handleWeightSelect}
              >
                <option value="10kg">10kg</option>
                <option value="20kg">20kg</option>
                <option value="30kg">30kg</option>
              </select>
            </div>
            <div className="charts">
              <div className="line-chart">
                <Line
                  data={this.state.chartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          id: "A",
                          type: "linear",
                          position: "left",
                        },
                      ],
                    },
                  }}
                />
              </div>
              <div className="bar-chart">
                <Bar
                  data={this.state.chartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          id: "B",
                          type: "linear",
                          position: "right",
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <table className="statistics-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>평균가격</th>
                <th>전월대비</th>
                <th>전년대비</th>
                <th>평년대비</th>
              </tr>
            </thead>
            <tbody>
              {this.state.statistics.map((data, index) => (
                <tr key={index}>
                  <td>{data.month}</td>
                  <td>{data.avgPrice}</td>
                  <td>전월대비</td>
                  <td>전년대비</td>
                  <td>평년대비</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WordCloud;
