import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import Dashboard from "views/Dashboard";
import Predict from "../views/Predict";
import Koreamap from "../views/Koreamap";
import Search from "../views/Search";
import Information from "views/Information";

function Forecast() {
  console.log(NongNet());
  return (
    <div>
      <IndexNavbar />
      <Search />
      <Predict />
      <Koreamap />
      <Information />
      <Dashboard />
    </div>
  );
}

export default Forecast;
