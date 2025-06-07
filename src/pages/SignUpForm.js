import React, { useState } from "react";
import "./SignUpForm.css"; // 스타일을 위한 CSS 파일

const SignUpForm = () => {
  // 폼 입력 값 상태 관리
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // 상태 메시지 (회원가입 성공 또는 오류 메시지)
  const [message, setMessage] = useState("");

  // 입력 값 변경 처리 함수
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 이메일 유효성 검사 함수 (간단한 정규식 사용)
  const isValidEmail = (email) => {
    return (
      typeof email === "string" &&
      email.includes("@") &&
      email.includes(".com") &&
      email.indexOf("@") < email.lastIndexOf(".com") // '@'이 '.com'보다 앞에 있는지 확인
    );
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    const { name, email, password } = form;

    // 모든 필드가 입력되지 않은 경우 메시지 표시
    if (!name || !email || !password)
      return setMessage("모든 필드를 입력해주세요.");

    // 이메일이 유효하지 않으면 메시지 표시
    if (!isValidEmail(email))
      return setMessage("유효한 이메일 주소를 입력해주세요.");

    // 회원가입 성공 메시지 표시 후 입력 필드 초기화
    setMessage("회원가입이 완료되었습니다!");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름, 이메일, 비밀번호 입력 필드 */}
        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"} // 비밀번호는 비밀번호 입력으로 처리
            name={field}
            placeholder={
              field === "name"
                ? "이름"
                : field === "email"
                ? "이메일"
                : "비밀번호"
            }
            value={form[field]}
            onChange={handleChange} // 입력 값 변경 시 상태 업데이트
          />
        ))}
        {/* 제출 버튼 */}
        <button type="submit">가입하기</button>
      </form>

      {/* 상태 메시지 표시 (회원가입 성공 또는 오류 메시지) */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignUpForm;
