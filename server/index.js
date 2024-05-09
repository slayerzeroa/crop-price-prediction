// 실행: 터미널에 node index.js 입력 (server 폴더에서 실행)

const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
// 루트 URL에 대한 GET 요청 처리
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// 데이터 읽어오기
app.get("/data", (req, res) => {
  const results = [];
  fs.createReadStream(path.join(__dirname, "../data/preprocessed/data.csv"))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    });
});

// date와 price 데이터만 추출
app.get("/price", (req, res) => {
  const results = [];
  fs.createReadStream(path.join(__dirname, "../data/preprocessed/data.csv"))
    .pipe(csv())
    .on("data", (data) => results.push({ date: data.date, price: data.price }))
    .on("end", () => {
      res.json(results);
    });
});

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
