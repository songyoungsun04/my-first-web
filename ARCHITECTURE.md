# Architecture

## 1. 프로젝트 목표
- 개인 블로그의 글을 쉽고 빠르게 읽을 수 있게 한다.
- 작가(나)가 글을 간단히 작성, 수정, 발행할 수 있게 한다.
- Next.js App Router 기반으로 확장 가능한 구조를 유지한다.

## 2. 페이지 맵 (URL 구조 포함)
App Router 기준 경로 구조.

- / : 홈 (최근 글 목록, 검색 진입)
- /posts : 글 목록
- /posts/[id] : 글 상세
- /posts/new : 글 작성
- /mypage : 마이페이지 (프로필, 글 관리)

### 2.1 보호 라우트
- /posts/new
- /mypage (및 하위 경로)

### 2.2 공개 라우트
- /
- /posts
- /posts/[id]
- /login
- /signup

## 3. 유저 플로우
### 3.1 글 읽기
1) 홈에서 글 목록 확인
2) 글 목록에서 원하는 글 선택
3) 글 상세에서 본문 읽기
4) 필요 시 목록으로 복귀

### 3.2 글 작성
1) /posts/new 진입
2) 제목/본문 입력
3) 미리보기 확인
4) 발행
5) 발행 후 글 상세로 이동

### 3.3 마이페이지
1) /mypage 진입
2) 내 프로필 확인
3) 내 글 목록 확인
4) 글 수정 또는 삭제

### 3.4 인증 흐름 (Ch9)
1) /signup에서 회원가입
2) /login에서 로그인
3) 로그인 성공 후 /posts로 이동

### 3.5 글 수정/삭제 (Ch10)
1) 글 상세에서 수정/삭제 UI 노출
2) 수정 시 기존 데이터 로드 후 저장
3) 삭제 시 확인 후 목록으로 이동

> 수정/삭제 UI는 UX 목적이며 실제 보안은 Ch11 RLS에서 처리한다.

## 4. 상단 내비게이션 상태
- 비로그인: 로그인 / 회원가입
- 로그인: 글쓰기 / 로그아웃

## 5. 컴포넌트 구조

- App Router 기준 페이지: app/, app/posts/, app/posts/[id], app/posts/new
- Auth 전역 상태: contexts/AuthContext.tsx (useAuth/AuthProvider)
- 헤더 인증 분기: components/AuthNav.tsx
- 게시글 폼: components/PostForm.tsx (작성/수정 공용)
- 목록 UX: components/PostsListClient.tsx (검색/삭제)
- 데이터 접근: lib/supabase/client.ts, lib/posts.ts

### 5.1 posts 페이지 구조
- app/posts/page.tsx: 목록 조회 및 링크 렌더링
- app/posts/[id]/page.tsx: 상세 조회 + 수정/삭제 UI
- app/posts/new/page.tsx: 작성 폼

## 6. 데이터 모델

### 6.1 profiles
- id (uuid, PK, auth.users.id 참조)
- username (text)
- avatar_url (text)
- role (text)

### 6.2 posts
- id (uuid, PK)
- user_id (uuid, FK -> profiles.id)
- title (text)
- content (text)
- created_at (timestamptz)
