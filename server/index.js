// 실행: 터미널에 node index.js 입력 (server 폴더에서 실행)

const express = require("express");
// const fs = require("fs");
// const csv = require("csv-parser");
const app = express();
const path = require("path");
const cors = require("cors");

// // env\db\db_env.txt 파일에서 DB 정보 읽어오기
// const fs = require("fs");
// const dotenv = require("dotenv");
// dotenv.config();

// const db_env = fs
//   .readFileSync(path.join(__dirname, "../env/db/db_env.txt"))
//   .toString();
// const db_env_list = db_env.split("\n");

// const db_host = db_env_list[0].split("\r")[0];
// const db_user = db_env_list[1].split("\r")[0];
// const db_password = db_env_list[2].split("\r")[0];
// const db_database = db_env_list[3].split("\r")[0];
// //

// mariadb 연결
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "ajoufe.iptime.org",
  user: "Ajou",
  password: "0i!gx8D4uD5gRJdS",
  database: "aicapstone",
  connectionLimit: 5,
});

app.use(cors());

// 루트 URL에 대한 GET 요청 처리
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// 데이터 읽어오기
app.get("/data", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn.query("SELECT * FROM crop").then((rows) => {
      rows.forEach((row) => {
        results.push(row);
      });
      res.json(results);
    });
    conn.release();
  });
});

// date와 price 데이터만 추출
app.get("/price", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn.query("SELECT ymd, price FROM crop").then((rows) => {
      rows.forEach((row) => {
        results.push(row);
      });
      res.json(results);
    });
    conn.release();
  });
});

// 최근 30일 데이터만 추출
app.get("/recent", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn
      .query("SELECT ymd, price FROM crop ORDER BY ymd DESC LIMIT 30")
      .then((rows) => {
        rows.forEach((row) => {
          results.push(row);
        });
        res.json(results);
      });
    conn.release();
  });
});

// // 예측값 데이터 읽어오기
// app.get("/prediction", (req, res) => {
//   const results = [];
//   fs.createReadStream(path.join(__dirname, "../data/prediction/prediction.csv"))
//     .pipe(csv())
//     .on("data", (data) => results.push(data))
//     .on("end", () => {
//       res.json(results);
//     });
// });

const PORT = 5556;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
