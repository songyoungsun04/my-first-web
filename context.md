# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-06-01
- 완료된 작업: 홈 페이지, 헤더/푸터 레이아웃, 포스트 CRUD (Supabase 연동), 포스트 목록/상세/작성/수정/삭제 연결, 데이터베이스 스키마, 이메일/비밀번호 인증, AuthProvider 연동, /posts/new 보호 라우트, posts RLS 활성화 및 정책 적용, Ch12 에러 처리/UX 개선(글로벌 에러 바운더리, 로딩 상태, 폼 검증, 에러 메시지 변환)
- 진행 중: Ch11 RLS 검증(브라우저 우회 테스트)
- 미착수: 마이페이지
- 확인 필요: Supabase CLI 연결(projects list, api-keys), .env.local 환경변수 값 재확인, RLS 우회 테스트 결과 기록

## 변경 파일

- ARCHITECTURE.md: 컴포넌트 구조/데이터 모델 보강, 인증 흐름 추가
- lib/auth.ts, app/login/page.tsx, app/signup/page.tsx: 로그인/회원가입 기능 추가
- contexts/AuthContext.tsx, components/AuthNav.tsx: 전역 상태 추가 및 헤더 연동
- middleware.ts: /posts/new 보호 라우트 설정
- lib/supabase/client.ts: createClient 추가 및 브라우저 클라이언트 정비
- lib/posts.ts: Supabase CRUD(select/insert/update/delete) 정리
- app/posts/page.tsx: 게시글 목록 조회 및 렌더링
- app/posts/[id]/page.tsx: 게시글 상세 조회, 수정/삭제 UI
- app/posts/new/page.tsx: 게시글 작성
- components/PostForm.tsx: 작성/수정 공용 폼
- components/PostsListClient.tsx: 목록 검색/삭제 UX
- app/error.tsx: 글로벌 에러 바운더리 UI
- app/posts/loading.tsx, app/posts/[id]/loading.tsx: 목록/상세 로딩 UI
- lib/error-message.ts: Supabase/네트워크 에러 메시지 변환 유틸
- app/login/page.tsx, app/signup/page.tsx: 에러 메시지 변환 적용

## Ch12 에러 처리/UX 요약

- error.tsx/loading.tsx: app/error.tsx, app/posts/loading.tsx, app/posts/[id]/loading.tsx
- 화면별 상태
	- /posts: 로딩 카드, 빈 상태 CTA, 에러 시 재시도 버튼
	- /posts/[id]: 로딩 안내, notFound 처리, 에러 메시지
	- 전역: 글로벌 에러 바운더리(재시도/홈 이동)
- 폼 검증 규칙 (PostForm)
	- 제목: 필수, 최소 2자
	- 내용: 필수, 최소 10자
- 에러 메시지 변환 규칙 (lib/error-message.ts)
	- 42501 또는 row-level security → "이 작업을 수행할 권한이 없습니다."
	- Failed to fetch → "인터넷 연결을 확인해주세요."
	- not found → "요청한 게시글을 찾을 수 없습니다."
	- 기본값 → "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
- docs/supabase-schema.sql: Supabase용 스키마 SQL 추가
- supabase/migrations/20260531150430_add_posts_rls_policies.sql: posts RLS 정책
- todo.md: 진행률 반영

## 기술 결정 사항

- 인증: Supabase Auth 이메일/비밀번호 (signInWithPassword, signUp, signOut)
- 세션 처리: App Router + `@supabase/ssr`
- 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (Ch8 연결 재확인)
- Supabase 클라이언트: `lib/supabase/client.ts` 사용
- 전역 인증 상태: useAuth/AuthProvider 사용
- 상태관리: React Context (AuthProvider)
- 보호 라우트: middleware.ts 기반 (/posts/new 접근 차단)
- Supabase 대시보드: Authentication -> Providers -> Email 및 URL Configuration 확인
- 이미지: Supabase Storage 사용 예정
- Supabase 쿼리 패턴: select, insert, update, delete (lib/posts.ts)
- 작성자 UI 분기: user.id === post.user_id
- posts 컬럼명(Ch8 고정): id, user_id, title, content, created_at
- profiles 컬럼명(Ch8 고정): id, username, avatar_url, role
- RLS 정책은 Supabase CLI 마이그레이션(supabase/migrations)으로 관리 (SQL Editor 직접 실행 금지)
- RLS 기준: posts.user_id = auth.uid()
- posts RLS 활성화
- RLS 적용 대상: posts
- 적용 정책: SELECT 누구나, INSERT 로그인 본인, UPDATE 작성자, DELETE 작성자
- 마이그레이션 파일: supabase/migrations/20260531150430_add_posts_rls_policies.sql
- 클라이언트 UI 분기는 보안이 아니며 실제 보안은 Ch11 RLS에서 처리
- service_role 키는 클라이언트/미들웨어에서 절대 사용하지 않음

## 테스트 결과 (RLS)

- 비로그인 조회: 미확인
- 비로그인 작성: 미확인
- 사용자 A 작성: 미확인
- 사용자 B가 A 글 수정: 미확인
- 사용자 B가 A 글 삭제: 미확인

## 버전 정책

- 교재 기준: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2
- 현재 설치 기준: Next.js 16.2.1, `@supabase/supabase-js` 2.105.3, `@supabase/ssr` 0.10.2
- 수업 프롬프트와 설명은 교재 기준으로 통일 (빌드 이슈는 설치 기준 확인)

## 해결된 이슈

- shadcn/ui Button variant가 디자인 토큰과 불일치 → globals.css의 --primary 수정으로 해결
- 모바일 헤더 메뉴가 겹침 → Sheet 컴포넌트로 교체

## 알게 된 점

- Tailwind CSS 4 기준에서는 `@import "tailwindcss"` + `@theme` 블록으로 설정 (`tailwind.config.js` 불필요)
- Server Component에서 useRouter 사용 불가 → redirect() 사용
- Supabase 스키마는 UUID PK, 역할(role) 체크, FK on delete cascade를 기본으로 잡는 편이 안전