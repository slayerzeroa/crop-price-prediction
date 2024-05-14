import React from "react";
import "../components/Navbars/CustomNavbar";
import Daemyeong from "../assets/img/images/Daemyeong.jpeg";
import Daeun from "../assets/img/images/Daeun.jpeg";
import Heeji from "../assets/img/images/Heeji.jpeg";

function Service() {
  return (
    <div>
      <div className="t-left fw-bold">
        안녕하세요,
        <br />
        배추도사 서비스를 소개합니다.
        <br />
        <br />
        저희 서비스는 농산물 생산량 예측을 통해 지방자치단체에게 가격 안정을
        도모하고자 설계되었습니다. <br />
        농산물 시장에서의 가격 변동은 농가와 소비자 모두에게 영향을 미칩니다.
        <br />
        따라서 우리는 정확한 예측을 통해 시장의 불안정성을 줄이고자 합니다.
        <br />
        <br />
        서비스 특징:
        <ul>
          <li>
            정확한 예측: 최신 기술과 데이터를 활용하여 농산물 생산량을 정확하게
            예측합니다.
          </li>
          <li>
            지방자치단체 지원: 지역 정책 수립 및 전개에 필요한 정보를 제공하여
            지방자치단체의 농산물 시장 안정화를 지원합니다.
          </li>
          <li>
            농가와 시장 연결: 농가와 시장 간의 원활한 소통과 협력을 촉진하여
            농산물 시장의 효율성을 높입니다.
          </li>
        </ul>
        배추도사 서비스는 농산물 시장의 안정성을 향상시키고 지역 경제 발전에
        기여합니다.
        <br />
        저희와 함께 지역사회와 농가의 발전을 위해 노력해 보시기를 권장합니다.
        <br />
        <br />
        문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
        <br />
        <br />
        감사합니다.
        <br />
        배추도사 서비스 팀
        <br />
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
    </div>
  );
}

export default Service;
