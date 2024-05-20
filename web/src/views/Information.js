import React from "react";

import { useState, useEffect } from "react";

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

import { Line, Bar } from "react-chartjs-2";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Information() {
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
    fetch("http://localhost:5556/recent")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.date);
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
    fetch("http://localhost:5556/prediction")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.date);
        const dataPoints = data.map((item) => item.prediction);
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

  //   console.log(nowData.datasets[0].data);
  console.log(predData);
  return (
    <>
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="title">농산물 정보</h5>
                <p className="category">배추</p>
              </CardHeader>

              <Row>
                <Col xs={12} md={6}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-category">2024.05.16</h5>
                      <CardTitle tag="h4">배추 현재 가격</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h3 className="card-category">
                        {
                          nowData.datasets[0].data[
                            nowData.datasets[0].data.length - 1
                          ]
                        }
                      </h3>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i className="now-ui-icons loader_refresh spin" />{" "}
                        Updated 3 minutes ago
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="card-tasks">
                    <CardHeader>
                      <h5 className="card-category">2024.06.30</h5>
                      <CardTitle tag="h4">배추 예측 가격</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <h3 className="card-category">
                        {
                          predData.datasets[0].data[
                            predData.datasets[0].data.length - 1
                          ]
                        }
                      </h3>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i className="now-ui-icons loader_refresh spin" />{" "}
                        Updated 3 minutes ago
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>

              {/* <CardBody>
                <div className="typography-line">
                  <h1>
                    <span>Header 1</span>The Life of Now Ui Dashboard{" "}
                  </h1>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Header 2</span>The Life of Now Ui Dashboard{" "}
                  </h2>
                </div>
                <div className="typography-line">
                  <h3>
                    <span>Header 3</span>The Life of Now Ui Dashboard{" "}
                  </h3>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>Header 4</span>The Life of Now Ui Dashboard{" "}
                  </h4>
                </div>
                <div className="typography-line">
                  <h5>
                    <span>Header 5</span>The Life of Now Ui Dashboard{" "}
                  </h5>
                </div>
                <div className="typography-line">
                  <h6>
                    <span>Header 6</span>The Life of Now Ui Dashboard{" "}
                  </h6>
                </div>
                <div className="typography-line">
                  <p>
                    <span>Paragraph</span>I will be the leader of a company that
                    ends up being worth billions of dollars, because I got the
                    answers. I understand culture. I am the nucleus. I think
                    that’s a responsibility that I have, to push possibilities,
                    to show people, this is the level that things could be at.
                  </p>
                </div>
                <div className="typography-line">
                  <span>Quote</span>
                  <blockquote>
                    <p className="blockquote blockquote-primary">
                      "I will be the leader of a company that ends up being
                      worth billions of dollars, because I got the answers. I
                      understand culture. I am the nucleus. I think that’s a
                      responsibility that I have, to push possibilities, to show
                      people, this is the level that things could be at."
                      <br />
                      <br />
                      <small>- Noaa</small>
                    </p>
                  </blockquote>
                </div>

                <div className="typography-line">
                  <span>Muted Text</span>
                  <p className="text-muted">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Primary Text</span>
                  <p className="text-primary">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Info Text</span>
                  <p className="text-info">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...{" "}
                  </p>
                </div>
                <div className="typography-line">
                  <span>Success Text</span>
                  <p className="text-success">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...{" "}
                  </p>
                </div>
                <div className="typography-line">
                  <span>Warning Text</span>
                  <p className="text-warning">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Danger Text</span>
                  <p className="text-danger">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...{" "}
                  </p>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Small Tag</span>
                    Header with small subtitle <br />
                    <small>Use "small" tag for the headers</small>
                  </h2>
                </div>
              </CardBody> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Information;
