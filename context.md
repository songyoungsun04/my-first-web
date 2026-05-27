# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-13
- 완료된 작업: 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록, 데이터베이스 스키마 초안, 이메일/비밀번호 인증, /posts/new 보호 라우트
- 진행 중: 포스트 상세 페이지 (UI 완료, 데이터 연결 미완)
- 미착수: 마이페이지

## 변경 파일

- ARCHITECTURE.md: 컴포넌트 구조/데이터 모델 보강, 인증 흐름 추가
- lib/auth.ts, app/login/page.tsx, app/signup/page.tsx: 로그인/회원가입 기능 추가
- contexts/AuthContext.tsx, components/AuthNav.tsx: 전역 상태 추가 및 헤더 연동
- middleware.ts: /posts/new 보호 라우트 설정
- docs/supabase-schema.sql: Supabase용 스키마 SQL 추가
- todo.md: 진행률 반영

## 기술 결정 사항

- 인증: Supabase Auth 이메일/비밀번호 (signInWithPassword, signUp, signOut)
- 세션 처리: App Router + `@supabase/ssr`
- 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (Ch8 연결 재확인)
- 상태관리: React Context (AuthProvider)
- 보호 라우트: middleware.ts 기반 (/posts/new 접근 차단)
- Supabase 대시보드: Authentication -> Providers -> Email 및 URL Configuration 확인
- 이미지: Supabase Storage 사용 예정

## 버전 정책

- 교재 기준: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2
- 실제 `package.json`이 더 최신일 수 있음
- 수업 프롬프트와 설명은 교재 기준으로 통일

## 해결된 이슈

- shadcn/ui Button variant가 디자인 토큰과 불일치 → globals.css의 --primary 수정으로 해결
- 모바일 헤더 메뉴가 겹침 → Sheet 컴포넌트로 교체

## 알게 된 점

- Tailwind CSS 4 기준에서는 `@import "tailwindcss"` + `@theme` 블록으로 설정 (`tailwind.config.js` 불필요)
- Server Component에서 useRouter 사용 불가 → redirect() 사용
- Supabase 스키마는 UUID PK, 역할(role) 체크, FK on delete cascade를 기본으로 잡는 편이 안전