import React from "react";
import { Link } from "react-router-dom"; // 라우팅을 위한 Link 컴포넌트
import "./Categories.css"; // 스타일 파일 불러오기

// Categories 컴포넌트: 상단 네비게이션 바 역할
// isLoggedIn: 로그인 여부
// onLogout: 로그아웃 함수
const Categories = ({ isLoggedIn, onLogout }) => (
  <header className="categories">
    {/* 왼쪽 영역에 홈 링크 */}
    <div className="left">
      <Link to="/" className="home-link">
        Home
      </Link>
    </div>

    {/* nav 중앙 메뉴 영역 */}
    <nav className="menu">
      <Link to="/breeds">고양이 종류</Link>
      <Link to="/CatTarot">고양이 타로</Link>
      <Link to="/behavior">고양이 행동</Link>
      <Link to="/post">게시판</Link>
    </nav>

    {/* 오른쪽에 로그인 여부에 따라 내용 변경 */}
    <div className="right">
      {isLoggedIn ? (
        // 로그인된 상태: 환영 메시지 + 로그아웃 버튼 표시
        <div>
          <span>환영합니다!</span>
          <button onClick={onLogout}>로그아웃</button>
        </div>
      ) : (
        // 로그인되지 않은 상태: 로그인 / 회원가입 링크 표시
        <span>
          <Link to="/login" className="small-link">
            로그인
          </Link>{" "}
          /{" "}
          <Link to="/signup" className="small-link">
            회원가입
          </Link>
        </span>
      )}
    </div>
  </header>
);

export default Categories; // 외부에서 사용할 수 있도록 export
