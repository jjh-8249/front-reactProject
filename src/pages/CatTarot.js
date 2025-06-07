import React, { useState } from "react";
import "./CatTarot.css"; // 타로 스타일 시트 불러오기

// 타로 메시지 목록 (랜덤으로 하나가 선택됨)
const tarotMessages = [
  {
    title: "츤데레의 기사",
    message: "겉은 시크하지만 속은 따뜻하다옹. 오늘은 마음을 열 시간!",
  },
  {
    title: "배고픈 마법사",
    message: "간식이 운명의 열쇠다. 맛있는 걸 놓치지 말라냥!",
  },
  {
    title: "햇살의 여왕",
    message: "따스한 햇살이 너의 하루를 감쌀 거다옹. 긍정의 힘을 믿으라옹.",
  },
  {
    title: "숨은 발톱",
    message: "겉보기엔 조용하지만, 결정적인 순간에 힘을 발휘하라옹.",
  },
  {
    title: "집사의 그림자",
    message: "때로는 누군가를 따라가는 것도 나쁘지 않다냥.",
  },
  {
    title: "이불 유목민",
    message: "어디서든 편안함을 찾는 능력. 오늘은 쉬어가도 괜찮다옹.",
  },
];

// 🐱 CatTarot 컴포넌트
const CatTarot = () => {
  // 상태 정의
  const [imageUrl, setImageUrl] = useState(""); // 고양이 이미지 URL
  const [tarot, setTarot] = useState(null); // 선택된 타로 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // TheCatAPI 개인 API 키 (보통은 환경 변수로 관리)
  const API_KEY =
    "live_mOxuhsufEYhxo99huqcKbmCbC7O2qDAiUYPfEY9W4iHp4oyfTecXNb2rnF1RqWTi";

  // 타로 카드 뽑기 함수 (비동기)
  const drawCard = async () => {
    setIsLoading(true); // 버튼 비활성화 및 로딩 시작
    setTarot(null); // 이전 타로 결과 초기화

    try {
      // 고양이 이미지 요청
      const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // API 키 포함
        },
      });

      if (!res.ok) {
        throw new Error("고양이 이미지를 불러오는 데 실패했습니다.");
      }

      const data = await res.json();
      setImageUrl(data[0].url); // 이미지 URL 저장

      // 타로 메시지 무작위 선택
      const randomIndex = Math.floor(Math.random() * tarotMessages.length);
      setTarot(tarotMessages[randomIndex]); // 상태에 저장
    } catch (error) {
      console.error("API 호출 오류:", error); // 오류 처리
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트 렌더링
  return (
    <div className="tarot-container">
      <h1>🐱 오늘의 냥이 타로카드</h1>

      {/* 카드 뽑기 버튼 */}
      <button className="draw-btn" onClick={drawCard} disabled={isLoading}>
        {isLoading ? "카드를 뽑는 중…" : "카드 뽑기"}
      </button>

      {/* 타로 카드가 선택된 경우 결과 표시 */}
      {tarot && (
        <div className="card">
          <img src={imageUrl} alt="Tarot Cat" className="cat-image" />
          <h2 className="card-title">🐾 {tarot.title}</h2>
          <p className="card-message">{tarot.message}</p>
        </div>
      )}
    </div>
  );
};

export default CatTarot; // 외부에서 사용할 수 있도록 컴포넌트 export
