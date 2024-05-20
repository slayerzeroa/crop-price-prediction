import React from "react";

function Table() {
  return (
    <div>
      <caption
        style={{
          textAlign: "center",
          fontWeight: "bold",
          display: "block",
          width: "100%",
          whiteSpace: "nowrap",
          color: "black",
          marginTop: "10px", // 적절한 마진을 추가하여 테이블과 간격을 조정합니다.
        }}
      >
        채소류/배추/전체, 등급 : 중품, 단위 : 1포기
      </caption>
      <div style={{ textAlign: "center" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "70%", // 테이블의 너비를 조정합니다.
            margin: "auto", // 테이블을 가운데 정렬합니다.
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#666", color: "white" }}>
              <th>날짜</th>
              <th>가격</th>
              <th>등락률</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9)].map((_, index) => (
              <tr key={index}>
                {[...Array(3)].map((_, index) => (
                  <td
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    셀 {index + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
