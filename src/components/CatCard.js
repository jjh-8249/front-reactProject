import React, { useEffect, useState } from "react";
import "./CatCard.css";

// 🐱 CatCard 컴포넌트 정의
const CatCard = () => {
  // cats 상태 정의 (고양이 이미지 목록 저장)
  const [cats, setCats] = useState([]);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // TheCatAPI로부터 고양이 이미지 10장을 가져옴
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((res) => res.json()) // 응답을 JSON으로 파싱
      .then(setCats) // 받아온 데이터를 cats 상태에 저장
      .catch((err) => console.error("이미지 로딩 오류:", err)); // 에러 처리
  }, []); // 빈 배열 → 마운트될 때 한 번만 실행

  return (
    <div className="cat-card">
      <h2>🐱 랜덤 고양이 10장</h2>
      <p>새로고침하면 랜덤 고양이가 나와요!</p>

      <div className="cat-grid">
        {cats.length > 0 ? ( // 고양이 이미지가 로드된 경우
          cats.map((cat, idx) => (
            <div key={idx} className="cat-image-wrapper">
              {/* 각 고양이 이미지 렌더링 */}
              <img src={cat.url} alt={`cat-${idx}`} />
            </div>
          ))
        ) : (
          // 고양이 이미지가 아직 로드되지 않은 경우
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
};

export default CatCard; // CatCard 컴포넌트를 외부에서 사용할 수 있도록 export
