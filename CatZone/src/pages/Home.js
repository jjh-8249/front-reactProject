import React from "react";
import CatCard from "../components/CatCard";
import "./Home.css"; // CSS 파일 import

const Home = () => {
  return (
    <div className="home-container">
      <h1>😺 CatZone에 오신 걸 환영합니다!</h1>
      <p>고양이 세상 탐험을 시작하세요!</p>
      <CatCard />
    </div>
  );
};

export default Home;
