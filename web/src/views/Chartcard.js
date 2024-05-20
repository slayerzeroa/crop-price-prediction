import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function ChartCard({ title, category, content, chartArea }) {
  return (
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category">{category}</h5>
        <CardTitle tag="h4">{title}</CardTitle>
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
            <DropdownItem className="text-danger">Remove data</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <div className="chart-area">{chartArea}</div>
      </CardBody>
      <CardFooter>
        <div className="stats">
          <i className="now-ui-icons arrows-1_refresh-69" /> Just Updated
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartCard;
