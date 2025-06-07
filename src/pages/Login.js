import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import "./Login.css"; // 로그인 관련 스타일 불러오기

// Login 컴포넌트 (props로 onLogin 함수 받음)
const Login = ({ onLogin }) => {
  // 입력 폼 상태
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 사용자에게 보여줄 메시지 상태 (예: 오류 메시지, 성공 메시지 등)
  const [message, setMessage] = useState("");

  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();

  // 입력 필드 변화 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작(새로고침) 막기

    // 입력값 유효성 검사
    if (!form.email || !form.password) {
      setMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 이메일 형식 간단 검증
    if (!form.email.includes("@")) {
      setMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    // 로그인 성공 시 처리
    console.log("로그인 정보:", form); // 개발자 확인용 콘솔 출력
    onLogin(); // App 컴포넌트에서 전달된 로그인 상태 업데이트 함수 호출
    setMessage("로그인 성공!");
    setForm({ email: "", password: "" }); // 폼 초기화
    navigate("/"); // 홈 페이지로 이동
  };

  // 컴포넌트 렌더링
  return (
    <div className="login-container">
      <h2>로그인</h2>

      {/* 메시지가 있을 경우에만 출력 */}
      {message && <p className="message">{message}</p>}

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login; // 컴포넌트를 외부에서 사용할 수 있도록 export
