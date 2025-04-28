import React, { useState } from "react";
import { List, InfiniteLoader } from "react-virtualized";
import "./Post.css"; // 게시글 스타일 시트

// 더미 게시글 생성 함수
const createDummyPosts = () =>
  Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `고양이 게시글 ${index + 1}`,
    content: `${index + 1}번째 게시물입니다. 고양이에 관한 내용`,
  }));

// 게시글 카드 컴포넌트
const PostCard = ({ post, style, onEdit, onDelete }) => {
  if (!post) {
    return (
      <div style={style} className="post-card loading">
        로딩 중...
      </div>
    );
  }

  // 내용 100자 초과 시 잘라서 표시
  const truncatedContent =
    post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

  return (
    <div style={style} className="post-card">
      <div className="post-header">
        <h3>{post.title}</h3>
        <div className="button-container">
          <button className="edit-btn" onClick={() => onEdit(post)}>
            수정
          </button>
          <button className="delete-btn" onClick={() => onDelete(post.id)}>
            삭제
          </button>
        </div>
      </div>
      <p>{truncatedContent}</p>
    </div>
  );
};

// 메인 Post 컴포넌트
const Post = () => {
  // 게시글 전체 상태
  const [allPosts, setAllPosts] = useState(createDummyPosts());

  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 새 게시글 작성 상태
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // 현재 렌더링 중인 게시글 수 (무한 스크롤용)
  const [visibleCount, setVisibleCount] = useState(5);

  // 검색어로 게시글 필터링
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 무한 스크롤로 보여줄 게시글 리스트
  const loadedPosts = filteredPosts.slice(0, visibleCount);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setVisibleCount(5); // 검색 시 리스트 초기화
  };

  // 무한 스크롤 로딩 함수
  const loadMoreRows = ({ stopIndex }) => {
    return new Promise((resolve) => {
      if (visibleCount > stopIndex) return resolve(); // 이미 로드된 항목은 건너뜀
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredPosts.length));
        resolve();
      }, 1000); // 로딩 효과 시뮬레이션
    });
  };

  // 항목이 이미 로딩되었는지 확인
  const isRowLoaded = ({ index }) => index < loadedPosts.length;

  // 리스트 렌더러
  const rowRenderer = ({ index, key, style }) => (
    <PostCard
      key={key}
      style={style}
      post={loadedPosts[index]}
      onEdit={(post) => {
        const newTitle = prompt("새 제목:", post.title);
        const newContent = prompt("새 내용:", post.content);
        if (newTitle && newContent) updatePost(post.id, newTitle, newContent);
      }}
      onDelete={deletePost}
    />
  );

  // 게시글 수정
  const updatePost = (id, updatedTitle, updatedContent) => {
    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, title: updatedTitle, content: updatedContent }
          : post
      )
    );
  };

  // 게시글 삭제
  const deletePost = (id) => {
    setAllPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // 새 게시글 추가
  const addPost = () => {
    if (!newPost.title || !newPost.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newId = allPosts.length + 1;
    const post = { id: newId, title: newPost.title, content: newPost.content };
    setAllPosts((prev) => [...prev, post]);
    setNewPost({ title: "", content: "" });
  };

  return (
    <div className="post-container">
      <h1>게시물</h1>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleSearchChange}
      />

      {/* 새 게시글 입력 폼 */}
      <input
        type="text"
        placeholder="제목"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="내용 (최대 100자)"
        value={newPost.content}
        onChange={(e) => {
          if (e.target.value.length <= 100) {
            setNewPost({ ...newPost, content: e.target.value });
          }
        }}
      />
      <button onClick={addPost}>게시글 작성</button>

      {/* 게시글 리스트 (무한 스크롤 적용) */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "700px", overflowY: "auto" }}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={filteredPosts.length}
            threshold={2}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                height={400}
                rowHeight={170}
                width={700}
                rowCount={loadedPosts.length}
                rowRenderer={rowRenderer}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
              />
            )}
          </InfiniteLoader>
        </div>
      </div>
    </div>
  );
};

export default Post; // 외부에서 사용 가능하게 export
