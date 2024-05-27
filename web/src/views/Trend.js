import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "../components/Navbars/Trend.css";

function Trend() {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "선택기간(24년)",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "전년동기(23년)",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  });

  useEffect(() => {
    fetch("http://ajoufe.iptime.org:5556/nongnet")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.pdltNm);
        const curSales = data.map((item) => item.curSlsAmt);
        const bfSales = data.map((item) => item.bfSlsAmt);
        setGraphData((prevData) => ({
          labels: labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: curSales,
            },
            {
              ...prevData.datasets[1],
              data: bfSales,
            },
          ],
        }));
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    function calculateDates() {
      const today = new Date();
      const fourWeeksAgo = new Date(today.setDate(today.getDate() - 21));
      const threeWeeksAgo = new Date(today.setDate(today.getDate() + 7));
      const formatDate = (date) => date.toISOString().split("T")[0];
      setDateRange({
        start: formatDate(fourWeeksAgo),
        end: formatDate(threeWeeksAgo),
      });
    }

    calculateDates();
  }, []);

  return (
    <div className="container">
      <div className="rounded-box">
        <h1 className="prediction-text">한눈에 보는 소비트렌드 TOP 5</h1>
        <div className="bar-chart">
          <Bar
            data={graphData}
            options={{
              maintainAspectRatio: true, // 이 설정을 true로 두고 aspectRatio를 조절합니다.
              aspectRatio: 1.9, // 너비 대비 높이 비율을 1:1로 설정
              indexAxis: "y",
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      // int value에서 억 단위로 환산해서 반환합니다.
                      return (value / 100000000).toFixed(1) + "억";
                    },
                  },
                },
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
          <div className="middle-text">{`${dateRange.start} ~ ${dateRange.end}`}</div>
          <div className="divider"></div>
          <div className="ranking-item">
            <div className="rank">1위</div>
            <div className="item">
              {graphData.labels[0]}
              {"    "}
              {(graphData.datasets[0].data[0] / 100000000).toFixed(1) + "억원"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trend;
