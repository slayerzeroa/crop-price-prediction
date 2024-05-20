import React from "react";
import "../components/Navbars/CustomNavbar";
import Daemyeong from "../assets/img/images/Daemyeong.jpeg";
import Daeun from "../assets/img/images/Daeun.jpeg";
import Heeji from "../assets/img/images/Heeji.jpeg";
import 배추 from "../assets/img/images/배추.png";
import 농가지원 from "../assets/img/images/농가지원.png";

function Introduce() {
  return (
    <div>
      <div className="container">
        <div className="flex-container">
          <div style={{ clear: "both" }}>
            <p className="text-center text-medium">
              "배추도사 서비스는 농산물 시장의 안정성을 향상시키고 지역 경제
              발전에 기여합니다. <br />
              저희와 함께 지역사회와 농가의 발전을 위해 노력해 보시기를
              권장합니다."
              <br />
            </p>
            <br />
          </div>
          <div className="text-box">
            <img
              src={배추}
              alt="배추"
              style={{ float: "left", marginRight: "20px", width: "400px" }}
            />
            <div
              style={{
                float: "right",
                marginLeft: "20px",
                width: "calc(100% - 440px)",
              }}
            >
              <br />
              <h2>배추도사 서비스는?</h2>
              <p>
                저희 서비스는 농산물 생산량 예측을 통해 지방자치단체에게 가격
                안정을 도모하고자 설계되었습니다. <br />
                농산물 시장에서의 가격 변동은 농가와 소비자 모두에게 영향을
                미칩니다.
                <br /> 따라서 우리는 정확한 예측을 통해 시장의 불안정성을
                줄이고자 합니다. <br />
              </p>
            </div>
          </div>

          <br />
          <br />

          {/* 중간에 공간 추가 */}
          <div
            className="text-box"
            style={{
              textAlign: "left",
              width: "100%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "20px" }}></p>
          </div>

          <div
            className="text-box2"
            style={{
              textAlign: "left",
            }}
          >
            <div
              style={{
                float: "right",
                width: "calc(100% - 20px)",
              }}
            >
              <img
                src={농가지원}
                alt="농가지원"
                style={{ float: "right", marginLeft: "20px", width: "400px" }}
              />
              <div
                style={{
                  float: "left",
                  width: "calc(100% - 440px)",
                }}
              >
                <br />
                <h2>우리의 목표는요!</h2>
                <p>
                  1. 정확한 예측: 최신 기술과 데이터를 활용하여 농산물 생산량을
                  정확하게 예측합니다.
                  <br />
                  2. 지방자치단체 지원: 지역 정책 수립 및 전개에 필요한 정보를
                  제공하여 지방자치단체의 농산물 시장 안정화를 지원합니다.
                  <br />
                  3. 농가와 시장 연결: 농가와 시장 간의 원활한 소통과 협력을
                  촉진하여 농산물 시장의 효율성을 높입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
        <div style={{ fontSize: "25px", fontWeight: "bold", color: "black" }}>
          농산물 가격 불안정으로 인한 농민 피해 극심으로
          <br />
          우리의 프로젝트는 시작하게 되었습니다.
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>
            생산량과 가격 예측의 실패로 막대한 예산을 투입한 정부의 노력에도
            불구하고, 농산물 수급 조절이 실패하게 되었습니다
            <br />
            이로 인해 농민들은 자신들의 수고로 얻은 작물을 저렴한 값에 팔거나
            심지어는 아예 산지에서 버려야 하는 상황에 처하게 되었습니다.
            <br />
            이러한 실패로 인해 발생하는 결과는 농산물 가격의 급등으로 인해
            구매자들도 장바구니 물가의 상승을 경험하게 됩니다.
            <br />
            또한, 농산물 수급 조절을 위해 진행되는 정책은 국민들의 세금으로
            지원되고 있음을 감안할 때, 이러한 실패는 국민 전체에게 영향을 미치는
            문제입니다.
          </p>
        </div>
      </div>

      <br />
      <div>
        <div style={{ fontWeight: "bold", color: "black", fontSize: "24px" }}>
          우리의 이념은 농산물 시장의 불안정성 완화 그리고,
        </div>
        <div style={{ fontWeight: "bold", color: "green", fontSize: "24px" }}>
          일년내내 값진 노력하는 생산자 보호입니다.
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>1. 농산물 시장 안정화:</strong>
            우리＇배추도사＇서비스는 농산물 시장의 불안정성을 완화하여 농산물
            가격의 급격한 변동을 줄일 수 있도록 도움을 줄 수 있습니다. <br />
            이를 통해 농산물 생산자와 소비자가 안정적인 시장 환경에서 경제적인
            활동을 할 수 있게 됩니다.
          </p>
          <p>
            <strong>2. 생산자 보호:</strong>
            우리＇배추도사＇서비스는 농민들이 생산한 농산물을 안정적인 가격에
            판매할 수 있도록 도와줍니다. <br />
            이는 농민들의 수익 안정화와 경영 안정성을 증대시킬 수 있습니다.
          </p>
          <p>
            <strong>3. 소비자 혜택:</strong>
            우리＇배추도사＇서비스는 소비자들이 미리 가격을 예측하여 구매 결정을
            내릴 수 있도록 도와줍니다. <br />
            이를 통해 소비자들은 더 나은 구매 결정을 내릴 수 있고, 농산물 가격
            변동에 따른 예기치 못한 급격한 가격 상승을 피할 수 있습니다.
          </p>
          <p>
            <strong>4. 정책 제안:</strong>
            우리＇배추도사＇서비스는 정부나 기타 이해 관계자들에게 농산물 시장의
            동향과 예측 정보를 제공하여 정책을 수립하고 시장 조절에 도움을 줄 수
            있습니다.
          </p>
        </div>
      </div>
      <br />
      <hr />
      <div>
        <h1 style={{ margin: 0, fontSize: "1.5em", fontWeight: "bold" }}>
          함께하는 사람들
        </h1>
        <br />
        <p>
          조직의 위대함은 개인 혼자서는 불가능한 일을 가능하게 만드는 것에
          있습니다.
        </p>
        <p>
          배추도사에서는 좋은 사람들과 좋은 영향을 주고 받으며 불가능을
          가능하게하는 팀원들을 소개합니다.
        </p>
      </div>

      <div className="wrapper">
        {" "}
        <ul className="team">
          {" "}
          <li className="team-item">
            {" "}
            <div className="profile profile_red">
              {" "}
              <img src={Daemyeong} />
              <div className="profile-contents">
                {" "}
                <h2>Daemyeong Yoo</h2>
                <p>Hello, My name is 유대명</p>
              </div>
            </div>
          </li>
          <li className="team-item">
            {" "}
            <div className="profile profile_beige">
              {" "}
              <img src={Daeun} />
              <div className="profile-contents">
                {" "}
                <h2>Daeun Yang</h2>
                <p>Hello, My name is 양다은</p>
              </div>
            </div>
          </li>
          <li className="team-item">
            {" "}
            <div className="profile profile_green">
              {" "}
              <img src={Heeji} />
              <div className="profile-contents">
                {" "}
                <h2>Heeji Jeong</h2>
                <p>Hello, My name is 정희지</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <hr />
      <br />
      <div style={{ clear: "both" }}>
        <p className="text-small">
          문의사항이 있으시면 언제든지 아래 연락처로 연락 주시기 바랍니다.
          <br />
          contact us : jhj020320@ajou.ac.kr
          <br />
          배추도사 서비스 팀
        </p>
      </div>
    </div>
  );
}

export default Introduce;
