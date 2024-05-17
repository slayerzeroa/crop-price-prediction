import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import Dashboard from "views/Dashboard";
import Information from "views/Information";
function Forecast() {
  return (
    <div>
      <IndexNavbar />
      <Information />
      <Dashboard />
    </div>
  );
}

export default Forecast;
