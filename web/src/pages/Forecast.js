import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import Dashboard from "views/Dashboard";
import Predict from "../views/Predict";
import Koreamap from "../views/Koreamap";
import Search from "../views/Search";

function Forecast() {
  return (
    <div>
      <IndexNavbar />
      <Search />

      <Predict />

      {/* <h2>Forecast 페이지</h2> */}

      <Koreamap />
      <Dashboard />
    </div>
  );
}

export default Forecast;
