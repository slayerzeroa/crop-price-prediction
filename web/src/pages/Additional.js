import React from "react";
import IndexNavbar from "../components/Navbars/CustomNavbar";
import RegularTables from "../views/TableList";
import Table from "../views/Table";
import WordCloud from "../views/Wordcloud";
import WordCloud2 from "../views/Wordcloud2";
import Graph from "../views/Graph";
import Search from "../views/Search";
import Trend from "../views/Trend";
import RealwordCloud from "views/Realwordcloud";

function Additional() {
  return (
    <div>
      <IndexNavbar />

      <Search />
      <Trend />

      <Graph />
      <RealwordCloud />
      <WordCloud />
      <WordCloud2 />

      <Table />
    </div>
  );
}

export default Additional;
