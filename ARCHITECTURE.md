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
- 에러 메시지 변환: lib/error-message.ts
- 글로벌 에러 바운더리: app/error.tsx
- 로딩 UI: app/posts/loading.tsx, app/posts/[id]/loading.tsx

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

## 7. 보안/RLS (Ch11)
- RLS 정책은 Supabase CLI 마이그레이션(supabase/migrations)으로 관리한다.
- posts 정책 기준은 user_id = auth.uid() 이다.
- 보안 계층: UI 분기(UX)와 RLS(DB 보안)를 명확히 구분한다.
- 클라이언트 UI 분기는 보안이 아니며 실제 보안은 RLS가 담당한다.
- service_role 키는 클라이언트/미들웨어에서 절대 사용하지 않는다.
- 보호 정책 목록 (posts):
	- SELECT: 누구나 (USING true)
	- INSERT: 로그인 사용자 본인 (WITH CHECK auth.uid() = user_id)
	- UPDATE: 작성자만 (USING auth.uid() = user_id, WITH CHECK 동일)
	- DELETE: 작성자만 (USING auth.uid() = user_id)

## 8. 에러 처리 & UX (Ch12)

### 8.1 화면별 loading/empty/error 상태
- /posts (app/posts/page.tsx)
	- loading: 목록 로딩 카드 + 안내 문구
	- empty: 게시글 없음 안내 + 첫 글 쓰기 버튼
	- error: 재시도 버튼 포함 에러 안내
- /posts/[id] (app/posts/[id]/page.tsx)
	- loading: 기본 텍스트 로딩 안내 (fallback)
	- not found: notFound() 호출로 404 처리
	- error: 상세 로딩 실패 시 메시지 표시
- /posts (대체 UI)
	- app/posts/loading.tsx: 목록 스켈레톤 로딩 UI
- /posts/[id] (대체 UI)
	- app/posts/[id]/loading.tsx: 상세 스켈레톤 로딩 UI
- 전역
	- app/error.tsx: 글로벌 에러 바운더리 + 재시도/홈 이동

### 8.2 폼 검증 규칙 (PostForm)
- 제목: 필수, 최소 2자
- 내용: 필수, 최소 10자
- 제출 중: 버튼/입력 비활성화 (중복 제출 방지)
- 실패 시: 각 필드 아래 에러 메시지 표시

### 8.3 에러 메시지 변환 규칙 (lib/error-message.ts)
- code 42501 또는 "row-level security" 포함: "이 작업을 수행할 권한이 없습니다."
- "Failed to fetch" 포함: "인터넷 연결을 확인해주세요."
- "not found" 포함: "요청한 게시글을 찾을 수 없습니다."
- 기본값: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
