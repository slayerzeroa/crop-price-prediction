// 실행: 터미널에 node index.js 입력 (server 폴더에서 실행)

const express = require("express");
// const fs = require("fs");
// const csv = require("csv-parser");
const app = express();
const path = require("path");
const cors = require("cors");

// env\db\db_env.txt 파일에서 DB 정보 읽어오기
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const db_env = fs
  .readFileSync(path.join(__dirname, "../env/db/db_env.txt"))
  .toString();
const db_env_list = db_env.split("\n");

const db_host = db_env_list[0].split("\r")[0];
const db_user = db_env_list[1].split("\r")[0];
const db_password = db_env_list[2].split("\r")[0];
const db_database = db_env_list[3].split("\r")[0];

// mariadb 연결
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
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

// 예측값 데이터 읽어오기
app.get("/pred", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn
      .query("SELECT ymd, pred FROM crop ORDER BY ymd DESC LIMIT 10")
      .then((rows) => {
        rows.forEach((row) => {
          results.push(row);
        });
        res.json(results);
      });
    conn.release();
  });
});

app.get("/nongnet", (req, res) => {
  const results = [];
  pool
    .getConnection()
    .then((conn) => {
      conn
        // ymd가 오늘 날짜인 데이터, 그 중에서도 curSlsAmt 상위 5개만 가져오기
        .query(
          "SELECT * FROM nongnet WHERE ymd = CURDATE() ORDER BY curSlsAmt DESC LIMIT 5"
        )
        .then((rows) => {
          rows.forEach((row) => {
            // 객체의 모든 BigInt 값을 문자열로 변환
            const convertedRow = {};
            for (let key in row) {
              if (typeof row[key] === "bigint") {
                // BigInt를 문자열로 변환
                convertedRow[key] = row[key].toString();
              } else {
                convertedRow[key] = row[key];
              }
            }
            results.push(convertedRow);
          });
          res.json(results); // 변환된 결과를 JSON으로 응답
        })
        .catch((err) => {
          console.error("Database query error:", err);
          res.status(500).json({ error: "Database query failed" });
        });
      conn.release();
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      res.status(500).json({ error: "Failed to connect to database" });
    });
});

// 예측값 데이터 읽어오기
app.get("/dosomae", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn
      .query(
        "SELECT * FROM dosomae WHERE ymd = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND type = '배추'"
      )
      .then((rows) => {
        rows.forEach((row) => {
          results.push(row);
        });
        res.json(results);
      });
    conn.release();
  });
});

// bigkinds 데이터 읽어오기
app.get("/bigkinds", (req, res) => {
  const results = [];
  // mariadb에서 데이터 읽어오기
  pool.getConnection().then((conn) => {
    conn
      // ymd가 오늘 날짜인 데이터
      .query("SELECT * FROM bigkinds WHERE ymd = CURDATE()")
      .then((rows) => {
        rows.forEach((row) => {
          results.push(row);
        });
        res.json(results);
      });
    conn.release();
  });
});

const PORT = 5556;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
