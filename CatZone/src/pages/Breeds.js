import React from "react";
import "./Breeds.css"; // 스타일 시트 불러오기 (디자인 개선용)

// 고양이 품종 목록을 생성하는 함수
const createCatBreeds = () => [
  {
    id: 1,
    name: "전체보기",
    url: "https://en.wikipedia.org/wiki/Cat",
  },
  {
    id: 2,
    name: "페르시안",
    url: "https://en.wikipedia.org/wiki/Persian_(cat)",
  },
  {
    id: 3,
    name: "먼치킨",
    url: "https://en.wikipedia.org/wiki/Munchkin_(cat)",
  },
  {
    id: 4,
    name: "벵갈",
    url: "https://en.wikipedia.org/wiki/Bengal_(cat)",
  },
  {
    id: 5,
    name: "러시안 블루",
    url: "https://en.wikipedia.org/wiki/Russian_Blue",
  },
  {
    id: 6,
    name: "아메리칸 쇼트헤어",
    url: "https://en.wikipedia.org/wiki/American_Shorthair",
  },
  {
    id: 7,
    name: "노르웨이 숲 고양이",
    url: "https://en.wikipedia.org/wiki/Norwegian_Forest_Cat",
  },
];

// Breeds 컴포넌트: 고양이 품종 리스트를 보여주는 UI
const Breeds = () => {
  const breeds = createCatBreeds(); // 품종 리스트 불러오기

  return (
    <div className="breeds-container">
      {/* 페이지 제목 */}
      <h2 className="breeds-header">고양이 인기품종 리스트</h2>

      {/* 품종 리스트 출력 */}
      <ul className="breeds-list">
        {breeds.map((breed) => (
          <li key={breed.id} className="breed-item">
            <a
              href={breed.url.trim()} // 링크 앞뒤 공백 제거
              target="_blank" // 새 탭에서 열기
              rel="noreferrer" // 보안상 noreferrer 설정
              className="breed-link"
            >
              <h3 className="breed-name">{breed.name}</h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breeds; // 외부에서 사용할 수 있도록 export
