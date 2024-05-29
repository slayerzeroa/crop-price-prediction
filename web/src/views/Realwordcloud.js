import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function RealwordCloud() {
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    fetch("http://ajoufe.iptime.org:5556/bigkinds")
      .then((response) => response.json())
      .then((data) => {
        setWordData(
          data.map((item) => ({ text: item.name, value: item.weight }))
        );
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="word-cloud-container">
      <div className="word-cloud">
        <ReactWordcloud words={wordData} />
      </div>
    </div>
  );
}

export default RealwordCloud;
