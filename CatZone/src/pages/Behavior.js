import React from "react";
import "./Behavior.css"; // 스타일 시트 불러오기

// 고양이의 행동과 그 의미를 담은 배열
const behaviors = [
  { icon: "🐾", text: "꼬리를 세우고 다가온다 → 친밀감 표시" },
  { icon: "😸", text: "골골 소리를 낸다 → 편안함" },
  { icon: "🐈", text: "배를 보여준다 → 신뢰함" },
  { icon: "👀", text: "눈을 천천히 깜빡인다 → 사랑의 표현" },
];

// Behavior 컴포넌트: 고양이의 행동을 시각적으로 보여주는 UI
const Behavior = () => (
  <div className="behavior-container">
    {/* 제목 */}
    <h2 className="behavior-header">고양이 행동의 의미 🐾</h2>

    {/* 행동 목록 */}
    <ul className="behavior-list">
      {behaviors.map((b, idx) => (
        <li key={idx} className="behavior-item">
          {/* 아이콘 (이모지) */}
          <span className="behavior-icon">{b.icon}</span>
          {/* 행동 설명 */}
          <span className="behavior-description">{b.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Behavior; // 외부에서 사용할 수 있도록 컴포넌트 export
