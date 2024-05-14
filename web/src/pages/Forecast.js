import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import Dashboard from "views/Dashboard";
function Forecast() {
  return (
    <div>
      <IndexNavbar />

      {/* <h2>Forecast 페이지</h2> */}
      <Dashboard />
    </div>
  );
}

export default Forecast;
