import React, { useState, useEffect } from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

import "./Dashboard.css"; // CSS 파일 임포트

function Dashboard() {
  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Price Data",
  //       data: [],
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   fetch("http://ajoufe.iptime.org:5556/recent")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const labels = data.map((item) => item.ymd).reverse();
  //       const dataPoints = data.map((item) => item.price).reverse();
  //       setChartData({
  //         labels: labels,
  //         datasets: [
  //           {
  //             ...chartData.datasets[0],
  //             data: dataPoints,
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);

  // const [predData, setPredData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Prediction Data",
  //       data: [],
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   fetch("http://ajoufe.iptime.org:5556/pred")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const labels = data.map((item) => item.ymd).reverse();
  //       const dataPoints = data.map((item) => item.pred).reverse();
  //       setPredData({
  //         labels: labels,
  //         datasets: [
  //           {
  //             ...predData.datasets[0],
  //             data: dataPoints,
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);

  const [chartData, setChartData] = useState({
    labels: [], // 공유 x축 레이블
    datasets: [
      {
        label: "Price Data",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Prediction Data",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
        tension: 0.1,
      },
    ],
  });
  // // pred는 10일 뒤로 밀고
  // // price는 10:부터 인덱싱
  // useEffect(() => {
  //   // 가정: 같은 API로부터 가격 데이터와 예측 데이터를 받아옵니다.
  //   fetch("http://ajoufe.iptime.org:5556/data")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const labels = data.map((item) => item.ymd);
  //       const prices = data.map((item) => item.price);
  //       const pred = data.map((item) => item.pred);
  //       setChartData((prev) => ({
  //         ...prev,
  //         labels: labels,
  //         datasets: [
  //           { ...prev.datasets[0], data: prices },
  //           { ...prev.datasets[1], data: pred },
  //         ],
  //       }));
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);

  useEffect(() => {
    // 가정: 같은 API로부터 가격 데이터와 예측 데이터를 받아옵니다.
    fetch("http://ajoufe.iptime.org:5556/data")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.ymd);
        const prices = data.map((item) => item.price).slice(5); // 10일부터 시작
        const predictions = data.map((item) => item.pred);

        // 10일 뒤로 밀기 위해 앞에 10개의 null 값을 추가
        const adjustedPredictions = new Array(5)
          .fill(null)
          .concat(predictions.slice(0, -5));

        setChartData((prev) => ({
          ...prev,
          labels: labels.slice(5), // 레이블도 10일부터 맞춤
          datasets: [
            { ...prev.datasets[0], data: prices },
            { ...prev.datasets[1], data: adjustedPredictions },
          ],
        }));
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      backgroundColor: "rgba(0, 0, 0, 0)", // 배경색 설정
    },
    scales: {
      x: {
        grid: {
          display: false, // x축 그리드 제거
        },
        ticks: {
          font: {
            size: 14, // x축 눈금 폰트 크기 조정
          },
        },
      },
      y: {
        grid: {
          drawBorder: false, // y축 외곽선 제거
          color: "#e0e0e0", // y축 그리드 색상 변경
        },
        ticks: {
          font: {
            size: 14, // y축 눈금 폰트 크기 조정
          },
          callback: function (value) {
            return value + "원"; // y축 눈금에 단위 추가
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (tooltipItem) {
            return (
              tooltipItem.dataset.label + ": " + tooltipItem.parsed.y + "원"
            );
          },
        },
      },
    },
    elements: {
      point: {
        radius: 5, // 데이터 포인트의 반지름
        hoverRadius: 8, // 마우스 호버 시 데이터 포인트의 반지름
        hoverBackgroundColor: "orange", // 마우스 호버 시 배경 색상
      },
      line: {
        tension: 0.4, // 선의 곡률
        borderWidth: 2, // 선의 두께
      },
    },
    animation: {
      duration: 1500, // 애니메이션 지속 시간
    },
  };

  return (
    <>
      {/* <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      /> */}
      {/* <PanelHeader
        size="lg"
        content={<Line data={chartData} options={{ responsive: true }} />}
      /> */}
      {/* <PanelHeader
        size="lg"
        content={
          // <Line data={chartData} options={dashboardPanelChart.options} />
          <Line data={chartData} options={chartOptions} />
        }
      />
      <h5 className="card-category">Predcition Data</h5>

      <PanelHeader
        size="lg"
        // content={<Line data={predData} options={dashboardPanelChart.options} />}
        content={<Line data={predData} options={chartOptions} />}
      /> */}
      <h5 className="card-category">Price Data</h5>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      {/* <h5 className="card-category">Predcition Data</h5>
      <div className="chart-container">
        <Line data={predData} options={chartOptions} />
      </div> */}

      {/* <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Global Sales</h5>
                <CardTitle tag="h4">Shipped Products</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2021 Sales</h5>
                <CardTitle tag="h4">All products</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Email Statistics</h5>
                <CardTitle tag="h4">24 Hours Performance</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">Backend Development</h5>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip907509347"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip496353037"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip389516969"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">All Persons List</h5>
                <CardTitle tag="h4">Employees Stats</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div> */}
    </>
  );
}

export default Dashboard;
