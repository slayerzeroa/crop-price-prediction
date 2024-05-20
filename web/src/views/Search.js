// Search.js

import React, { Component } from "react";
import "../components/Navbars/Search.css";

class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="검색어를 입력하세요"
        />
      </div>
    );
  }
}

export default Search;
