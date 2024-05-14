import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import RegularTables from "../views/TableList";
function Additional() {
  return (
    <div>
      <IndexNavbar />

      <h2>Additional 페이지</h2>
      <RegularTables />
      {/* Additional 페이지의 내용 */}
    </div>
  );
}

export default Additional;
