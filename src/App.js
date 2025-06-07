import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// 페이지 & 컴포넌트
import Categories from "./components/Categories";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Behavior from "./pages/Behavior";
import CatTarot from "./pages/CatTarot";
import Post from "./pages/Post";
import SignUpForm from "./pages/SignUpForm";
import Login from "./pages/Login";

import "./App.css";

function App() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 시
  const handleLogin = () => setIsLoggedIn(true);

  // 로그아웃 시
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {/* 상단 네비게이션 메뉴 */}
      <Categories isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* 메인 컨텐츠 라우팅 */}
      <div className="main-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/CatTarot" element={<CatTarot />} />
          <Route path="/behavior" element={<Behavior />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
